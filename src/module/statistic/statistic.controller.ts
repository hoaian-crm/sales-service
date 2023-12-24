import { Get, Query } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { TotalRevenueByProduct } from '../sales/dto/statistic.dto';
import { Response } from 'crm-prototypes';
import { ApiMetaData, AppController } from 'crm-permission';

@AppController('statistics', 'sales')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @ApiMetaData({
    description: 'Get total sold products',
    name: 'Get statistics',
    policy: 'sales:topTotalSoldProduct',
  })
  @Get('sales')
  async findAll() {
    const data = await this.statisticService.topTotalSoldProduct();
    return data;
  }

  @ApiMetaData({
    description: 'Get total_revenue_by_product',
    name: 'Get total sold products',
    policy: 'sales:total_revenue_by_product',
  })
  @Get('/total_revenue_by_product')
  async totalRevenueByProduct(@Query() query: TotalRevenueByProduct) {
    const result = await this.statisticService.totalRevenueByProduct(query);
    return Response.findSuccess([result, result.length]);
  }
}
