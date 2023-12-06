import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Product } from '../entity/product.entiry';

class ProductDto {
  @IsNumber()
  product: Product;

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
