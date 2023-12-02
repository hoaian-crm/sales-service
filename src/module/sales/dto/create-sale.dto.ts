import { IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsNumber()
  product_id: number;
}
