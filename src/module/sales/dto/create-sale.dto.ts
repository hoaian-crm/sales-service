import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

class ProductDto {
  @IsNumber()
  product: number;

  @IsNumber()
  amount: number;
}

export class CreateSaleDto {
  @IsNumber()
  customer_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  product: ProductDto[];
}
