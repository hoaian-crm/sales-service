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

  async findAndCount(dto: CreateSaleDto) {
    return await this.productModule.Get({ id: dto.product_id });
  }
}
