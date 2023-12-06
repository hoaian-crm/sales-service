import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entity/sale.entity';
import { DataSource, Repository } from 'typeorm';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FindSalesDto } from './dto/find';
import { Product, observableHandler } from 'crm-prototypes';

// enum STATUS {
//   NEW = 'NEW',
//   PENDING = 'PENDING',
// }

@Injectable()
export class SalesService implements OnModuleInit {
  private productModule: Product.IProductController;

  constructor(
    @InjectRepository(Sale) private salesRepository: Repository<Sale>,
    @Inject(Product.protobufPackage) private client: ClientGrpc,
    private dataSource: DataSource,
  ) {}

  onModuleInit() {
    this.productModule =
      this.client.getService<Product.IProductController>('IProductController');
  }

  async getAllSales(query: FindSalesDto) {
    return await this.salesRepository.findAndCount({
      take: query.limit,
      skip: (query.offset - 1) * query.limit,
    });
  }

  async createSales(dto: CreateSaleDto) {
    // const listIds = dto.product.map((i) => i.product);
    // const productList: Product.IProductResponse = await observableHandler(
    //   this.productModule.GetById({ id: listIds }),
    // );
    // if (!productList) throw new Error('error');
    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   for (let index = 0; index < productList.products.length; index++) {
    //     const element = productList.products[index];
    //     const item = dto.product.find((i) => i.id === element.id);
    //     // const record = this.salesRepository.create({ product: itemm });
    //     consle.log('record', item);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   await queryRunner.rollbackTransaction();
    //   throw error;
    // } finally {
    //   await queryRunner.release();
    // }
    // return productList;
  }
}
