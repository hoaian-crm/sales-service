import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TotalRevenueByProduct } from './dto/statistic.dto';
import { Sale } from './entity/sale.entity';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
  ) {}

  async totalRevenueByProduct(query: TotalRevenueByProduct) {
    // return this.saleRepository.query(
    //   `select sum(sales.amount) as "totalRevenue", date_part($1, sales."createdAt") as time, products.name  from sales
    //   inner join products on products.id = sales.product_id
    //   where "createdAt" >= $2 and "createdAt" <= $3
    //   group by date_part($1, sales."createdAt"), products.id
    //   `,
    //   values(query),
    // );

    return await this.saleRepository
      .createQueryBuilder('sale')
      .select(
        `sum(sale.amount) as "totalRevenue", date_part('hours', sale."createdAt") as time, product.name`,
      )
      .innerJoin('products', 'product', 'product.id = sale.id')
      .groupBy(`date_part('hours', sale."createdAt"), product.id`)
      .where(
        'extract(epoch from sale."createdAt") * 1000 >= :from and extract(epoch from sale."createdAt") * 1000 <= :to',
      )
      .setParameters(query)
      .getRawMany();
  }
}
