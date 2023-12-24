import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Response } from 'crm-prototypes';
import { CreateSaleDto } from './dto/create-sale.dto';
import { FindSalesDto } from './dto/find';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SalesService } from './sales.service';
import { ControllerMetaData, ApiMetaData, AppController } from 'crm-permission';

@AppController('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

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
}
