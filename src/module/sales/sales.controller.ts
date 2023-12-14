import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Response } from 'crm-prototypes';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FindSalesDto } from './dto/find';
import { TotalRevenueByProduct } from './dto/statistic.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SalesService } from './sales.service';
import { StatisticService } from './statistic.service';

@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly statisticService: StatisticService,
  ) {}

  @Get()
  async getAll(@Query() query: FindSalesDto) {
    const [result, count] = await this.salesService.getAllSales(query);
    return Response.findSuccess([result, count]);
  }

  @Post()
  async createSales(@Body() dto: CreateSaleDto) {
    const data = await this.salesService.createSales(dto);
    return Response.createSuccess(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSaleDto) {
    const data = await this.salesService.updateSales(+id, dto);
    return data;
  }

  @Get('/total_revenue_by_product')
  async totalRevenueByProduct(@Query() query: TotalRevenueByProduct) {
    return this.statisticService.totalRevenueByProduct(query);
  }
}
