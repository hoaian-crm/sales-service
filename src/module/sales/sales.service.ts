import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entity/sale.entity';
import { DataSource, In, Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FindSalesDto } from './dto/find';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private salesRepository: Repository<Sale>,
    private dataSource: DataSource,
  ) {}

  async getAllSales(query: FindSalesDto) {
    return await this.salesRepository.findAndCount({
      take: query.limit,
      skip: query.offset,
      relations: ['customer', 'product'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async updateSales(id: number, dto: UpdateSaleDto) {
    try {
      const sale = await this.salesRepository.findOne({
        where: {
          id: id,
        },
      });
      sale.amount = dto.amount;
      const result = await this.salesRepository.save(sale);
      return result;
    } catch (error) {
      console.log('error', error);
    }
  }

  async createSales(dto: CreateSaleDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let listId: number[] = [];

    try {
      for (let index = 0; index < dto.product.length; index++) {
        const element = dto.product[index];
        const newSales = this.salesRepository.create({
          customer: dto.customer_id,
          product: element.product,
          amount: element.amount,
        });
        const data = await queryRunner.manager.save(newSales);
        listId = [...listId, data.id];
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('error when create sales', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    const [response] = await this.salesRepository.findAndCount({
      where: {
        id: In(listId),
      },
      relations: ['product'],
    });

    return response;
  }

  async topTotalSold() {
    const topProduct = this.salesRepository
      .createQueryBuilder('sales')
      .select([
        'sales.product_id',
        'COUNT(*) as appearance_count',
        'SUM(sales.amount) as total_amount',
      ])
      .groupBy('sales.product_id')
      .orderBy('total_amount', 'DESC')
      .addOrderBy('total_amount', 'DESC')
      .getRawMany();

    return topProduct;
  }
}
