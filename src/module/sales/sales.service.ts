import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entity/sale.entity';
import { DataSource, In, Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FindSalesDto } from './dto/find';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Product } from './entity/product.entiry';
import { TotalRevenueByProduct } from './dto/statistic.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private salesRepository: Repository<Sale>,
    private dataSource: DataSource,
  ) {}

  async getAllSales(query: FindSalesDto) {
    // const value: any[] = await this.salesRepository.query(
    //   `
    //   SELECT sales.*,
    //   COALESCE(JSON_AGG(resource_tags.*) FILTER (WHERE resource_tags.id IS NOT NULL) ,'[]') AS tags,
    //   JSON_BUILD_OBJECT('id', products.id, 'name',products."name",'alias', products.alias, 'price', products.price, 'discount', products.discount) AS product,
    //   JSON_BUILD_OBJECT('id', customers.id, 'name',customers."name", 'email', customers.email, 'phone', customers.phone) AS customer
    //   FROM sales
    //   LEFT JOIN
    //       resource_tags ON sales.id = resource_tags.resource_id and resource_tags.resource ='sales'
    //   LEFT JOIN
    //       products ON sales.product_id = products.id
    //   LEFT JOIN
    //       customers ON sales.customer_id = customers.id
    //   GROUP BY
    //       sales.id, sales.status, sales."createdAt", sales."updatedAt", sales.product_id, sales.customer_id, sales.amount, products.id, customers.id
    //   LIMIT $1
    //   OFFSET $2
    // `,
    //   [query.limit, query.offset],
    // );

    const result = await this.salesRepository.findAndCount({
      take: query.limit,
      skip: query.offset,
      relations: ['product', 'tags'],
    });

    return result;
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
        COUNT(*) as total,
        SUM(sales.amount) AS amount
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
      .limit(10)
      .getRawMany();

    return topProduct;
  }

  async totalRevenueByProduct(query: TotalRevenueByProduct) {
    return await this.salesRepository.query(
      `
      with top_products as (
        select sum(sale.amount * product.price) as total_sale, product.id, product.price, product.name from sales sale
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

  getValue(value: { value: string }, defaultResource: string) {
    return {
      value: value.value,
      resource: defaultResource,
    };
  }
}
