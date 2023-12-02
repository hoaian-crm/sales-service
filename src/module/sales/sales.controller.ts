import { Body, Controller, Post } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  findAll(@Body() dto: CreateSaleDto) {
    return this.salesService.findAndCount(dto);
  }
}
