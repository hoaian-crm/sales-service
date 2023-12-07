import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entity/sale.entity';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FindSalesDto } from './dto/find';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private salesRepository: Repository<Sale>,
  ) {}

  async getAllSales(query: FindSalesDto) {
    return await this.salesRepository.findAndCount({
      take: query.limit,
      skip: query.offset,
      relations: ['customer_id'],
    });
  }

  async createSales(dto: CreateSaleDto) {
    const newSales = this.salesRepository.create({
      customer_id: dto.customer_id,
    });
    const sales = await this.salesRepository.save(newSales);
    return sales;
  }
}
