import { Controller, Get } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('statistics')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get('sales')
  findAll() {
    const data = this.statisticService.topTotalSoldProduct();

    return data;
  }
}
