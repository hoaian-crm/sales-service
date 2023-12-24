import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entity/sale.entity';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entiry';
import {
  TopTotalSoldProduct,
  TotalRevenueByProduct,
} from './dto/statistic.dto';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Sale) private salesRepository: Repository<Sale>,
  ) {}

  async topTotalSold(query: TopTotalSoldProduct) {
    const topProduct: Array<{
      count: number;
      total: number;
      id: number;
      price: number;
      name: string;
      alias: string;
    }> = await this.salesRepository
      .createQueryBuilder('sales')
      .select(
        `
        COUNT(*)::int as total,
        SUM(sales.amount)::int AS amount
        `,
      )
      .addSelect(
        `
        product.id as id,
        product.price as price ,
        product.name as name,
        product.alias as alias
      `,
      )
      .leftJoin(Product, 'product', 'product.id = sales.product_id')
      .orderBy('amount', 'DESC')
      .addOrderBy('total', 'DESC')
      .groupBy('sales.product_id, product.id')
      .limit(query.limit)
      .getRawMany();

    return topProduct;
  }

  async totalRevenueByProduct(query: TotalRevenueByProduct) {
    return await this.salesRepository.query(
      `
      with top_products as (
        select sum(sale.amount * product.price)::int as total_sale, product.id, product.price, product.name from sales sale
        inner join products product on sale.product_id = product.id
        where extract(epoch from sale."createdAt") between $1 and $2
        group by (product.id)
        order by total_sale DESC
        limit 5
      )
      select sum(sale.amount * top_product.price) as revenue, top_product.name, extract(${query.timeUnit} from sale."createdAt") as time, top_product.id from sales sale
      inner join top_products top_product on top_product.id = sale.product_id
      where extract(epoch from sale."createdAt") between $1 and $2
      group by extract(${query.timeUnit} from sale."createdAt"), top_product.id, top_product.name
      order by top_product.id
    `,
      [query.from, query.to],
    );
  }
}
