import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entity/sale.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FindSalesDto } from './dto/find';

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
    });
  }

  async createSales(dto: CreateSaleDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const listItem = dto.product.map((item) => item.product);

      for (let index = 0; index < listItem.length; index++) {
        const element = listItem[index];

        const newSales = this.salesRepository.create({
          customer: dto.customer_id,
          product: element,
          amount: 1,
        });

        await queryRunner.manager.save(newSales);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('error', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return { success: true };
  }
}
