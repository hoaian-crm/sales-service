import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entity/sale.entity';
import { Repository } from 'typeorm';
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
    const listIds = dto.product.map((i) => i.product);

    const listProduct = await observableHandler<Product.IProductResponse>(
      await this.productModule.GetById({ id: listIds }),
    );

    let product = [];

    for (let index = 0; index < listProduct.products.length; index++) {
      const element = listProduct.products[index];
      const item = dto.product.find((i) => i.product === element.id);
      product = [
        ...product,
        {
          product: element,
          amount: item.amount,
        },
      ];
    }

    return product;
  }
}
