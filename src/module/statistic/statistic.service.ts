import { Injectable } from '@nestjs/common';
import { SalesService } from '../sales/sales.service';
import { Response } from 'crm-prototypes';

@Injectable()
export class StatisticService {
  constructor(private readonly saleModules: SalesService) {}

  async topTotalSoldProduct() {
    const data = await this.saleModules.topTotalSold();
    return Response.findSuccess([data, data.length]);
  }
}
