import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Product } from './entity/product.entiry';
import { Sale } from './entity/sale.entity';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { StatisticService } from './statistic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Customer, Product])],
  controllers: [SalesController],
  providers: [SalesService, StatisticService],
  exports: [SalesService],
})
export class SalesModule {}
