import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entity/sale.entity';
import { Repository } from 'typeorm';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FindSalesDto } from './dto/find';
import { Product, observableHandler } from 'crm-prototypes';

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
    const listProduct = dto.product.map((i) => i.product_id);

    const aa = await observableHandler(
      await this.productModule.GetById({ id: listProduct }),
    );

    console.log(aa);

    return aa;
  }
}
