import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TotalRevenueByProduct {
  @IsString()
  timeUnit: string;

  @IsString()
  @IsOptional()
  tags?: string[] | string;

  @Type(() => Number)
  @IsNumber()
  from: number;

  @Type(() => Number)
  @IsNumber()
  to: number;
}
