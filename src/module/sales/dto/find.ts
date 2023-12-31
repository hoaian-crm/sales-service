import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindSalesDto {
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @Type(() => Number)
  @IsNumber()
  offset: number;
}
