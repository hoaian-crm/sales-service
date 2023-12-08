import { IsNumber } from 'class-validator';

export class UpdateSaleDto {
  @IsNumber()
  amount: number;
}
