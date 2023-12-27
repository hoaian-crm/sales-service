import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TimeLabels,
  TopTotalSoldProduct,
  TotalRevenue,
  TotalRevenueByProduct,
} from './dto/statistic.dto';
import { Sale } from './entity/sale.entity';

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
    }> = await this.salesRepository.query(
      `
        with table_sales as (select sales.product_id, sum(amount)::int as amount, count(*)::int as "totalInOrder"
          from sales 
          group by product_id 
          order by amount desc)
          select id, name, alias,description ,amount, "totalInOrder", price
          from table_sales 
          left join products 
          on products.id = table_sales.product_id
          limit $1;
      `,
      [query.limit],
    );
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

  async totalRevenue(query: TotalRevenue) {
    return await this.salesRepository.query(
      `
        with sale_revenue as (
          select product.price * sale.amount as revenue, sale.* from sales sale
          left join products product on product.id  = sale.product_id
        )
        select sum(sale.revenue) as revenue, replace(to_char(sale."createdAt", '${
          TimeLabels[query.timeUnit]
        }'), ' ', '') as "label"
        from sale_revenue sale
        where extract(epoch from sale."createdAt") between $1 and $2
        group by to_char(sale."createdAt", '${TimeLabels[query.timeUnit]}')
        order by label
      `,
      [query.from, query.to],
    );
  }
}
