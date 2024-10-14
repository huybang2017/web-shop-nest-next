import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsInt, Min } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Updated Example Product',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'This is an updated product description.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 79.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: 'The stock of the product',
    example: 15,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @ApiProperty({
    description: 'The ID of the supplier',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  supplier_id?: number;
}
