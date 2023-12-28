import { Body, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiMetaData, AppController } from 'crm-permission';
import { Response } from 'crm-prototypes';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FindSalesDto } from './dto/find';
import {
  GeneralStatistic,
  TopTotalSoldProduct,
  TotalRevenue,
  TotalRevenueByProduct,
} from './dto/statistic.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SalesService } from './sales.service';
import { StatisticService } from './statistic.service';

@AppController('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly statisticService: StatisticService,
  ) {}

  @ApiMetaData({
    description: 'User can get all sale',
    name: 'Get sales',
    policy: 'sales',
  })
  @Get()
  async getAll(@Query() query: FindSalesDto) {
    const [result, count] = await this.salesService.getAllSales(query);
    return Response.findSuccess([result, count]);
  }

  @ApiMetaData({
    description: 'User can create a order',
    name: 'Create sale',
    policy: 'sales:create',
  })
  @Post()
  async createSales(@Body() dto: CreateSaleDto) {
    const data = await this.salesService.createSales(dto);
    return Response.createSuccess(data);
  }

  @ApiMetaData({
    description: 'User can edit a order',
    name: 'Edit sale',
    policy: 'sales:edit',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSaleDto) {
    const data = await this.salesService.updateSales(+id, dto);
    return data;
  }

  @ApiMetaData({
    description: 'Get total sold products',
    name: 'Get statistics',
    policy: 'sales:topTotalSoldProduct',
  })
  @Get('top_total_sold_product')
  async findAll(@Query() query: TopTotalSoldProduct) {
    const data = await this.statisticService.topTotalSold(query);
    return Response.findSuccess([data, data.length]);
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

  @ApiMetaData({
    description: 'Get total revenue',
    name: 'Get total revenue',
    policy: 'sales:total_revenue',
  })
  @Get('/total_revenue')
  async totalRevenue(@Query() query: TotalRevenue) {
    const data = await this.statisticService.totalRevenue(query);
    return Response.findSuccess([data, data.length]);
  }

  @ApiMetaData({
    description: 'Get general statistic',
    name: 'Get general statistic',
    policy: 'sales:general_statistic',
  })
  @Get('/general_statistic')
  async generalStatistic(@Query() query: GeneralStatistic) {
    const data = await this.statisticService.generalStatistic(query);
    return Response.findSuccess([data, data.length]);
  }
}
