import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entity/sale.entity';
import { Customer } from './entity/customer.entity';
import { Product } from './entity/product.entiry';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Customer, Product])],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
