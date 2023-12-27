import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum TimeUnit {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year',
}

export const TimeLabels = {
  [TimeUnit.Day]: 'dd/mm',
  [TimeUnit.Week]: 'week',
  [TimeUnit.Month]: 'Month',
  [TimeUnit.Year]: 'year',
};

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

export class TotalRevenue {
  @IsString()
  @IsEnum(TimeUnit)
  @IsOptional()
  timeUnit: TimeUnit = TimeUnit.Month;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  from: number = 0;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  to: number = new Date().getTime();
}
