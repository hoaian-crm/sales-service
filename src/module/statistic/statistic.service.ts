import { Injectable } from '@nestjs/common';
import { SalesService } from '../sales/sales.service';

@Injectable()
export class StatisticService {
  constructor(private readonly saleModules: SalesService) {}

  async topTotalSoldProduct() {
    return this.saleModules.topTotalSold();
  }
}
