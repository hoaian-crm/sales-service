import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum TimeUnit {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

export const TimeLabels = {
  [TimeUnit.Day]: 'YYYY-MM-DD',
  [TimeUnit.Month]: 'YYYY-MM',
  [TimeUnit.Year]: 'YYYY',
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

export class GeneralStatistic {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  from: number = 0;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  to: number = new Date().getTime();

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  previousFrom: number = 0;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  previousTo: number = new Date().getTime();
}
