import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

class Product {
  @IsNumber()
  product_id: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  discount: number;
}

export class CreateSaleDto {
  @IsNumber()
  customer_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Product)
  product: Product[];
}
