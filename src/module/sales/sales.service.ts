import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entity/sale.entity';
import { Repository } from 'typeorm';
import {
  IProductController,
  protobufPackage,
} from 'src/prototypes/gen/ts/interfaces/product';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FindSalesDto } from './dto/find';

@Injectable()
export class SalesService implements OnModuleInit {
  private productModule: IProductController;

  constructor(
    @InjectRepository(Sale) private salesRepository: Repository<Sale>,
    @Inject(protobufPackage) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.productModule =
      this.client.getService<IProductController>('IProductController');
  }

  async getAllSales(query: FindSalesDto) {
    return await this.salesRepository.findAndCount({
      take: query.limit,
      skip: (query.offset - 1) * query.limit,
    });
  }

  async createSales(dto: CreateSaleDto) {
    const listProduct = dto.product.map((i) => i.product_id);

    const arrayProducts = await this.productModule.GetById({
      id: listProduct,
    });

    console.log('array', arrayProducts);

    // const result = Object.fromEntries(
    //   arrayProducts.products.map((item) => [item.id, item]),
    // );

    // console.log(result);

    return arrayProducts;
  }
}
