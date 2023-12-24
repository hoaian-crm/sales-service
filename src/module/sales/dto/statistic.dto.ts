import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum TimeUnit {
  Date = 'date',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export class TotalRevenueByProduct {
  @IsString()
  @IsEnum(TimeUnit)
  timeUnit: TimeUnit;

  @IsString()
  @IsOptional()
  tags?: string[] | string;

  @Type(() => Number)
  @IsNumber()
  from: number;

  @Type(() => Number)
  @IsNumber()
  to: number;

  @IsNumber()
  @Type(() => Number)
  limit: number = 10;
}

export class TopTotalSoldProduct {
  @IsNumber()
  @Type(() => Number)
  limit: number = 10;
}
