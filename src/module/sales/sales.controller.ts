import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FindSalesDto } from './dto/find';
import { Response } from 'crm-prototypes';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

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
}
