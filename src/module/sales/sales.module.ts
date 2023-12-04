import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entity/sale.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Product } from 'crm-prototypes';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    ClientsModule.register([
      {
        name: Product.protobufPackage,
        transport: Transport.GRPC,
        options: {
          url: process.env.PRODUCT_GRPC || 'localhost:50051',
          package: Product.protobufPackage,
          protoPath: 'node_modules/crm-prototypes/interfaces/product.proto',
          loader: {
            longs: Number,
          },
        },
      },
    ]),
  ],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
