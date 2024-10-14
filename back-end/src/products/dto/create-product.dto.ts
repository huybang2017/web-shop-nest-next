import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Example Product',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'This is an example product description.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 99.99,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The stock of the product',
    example: 10,
    default: 0,
  })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'The ID of the supplier',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  supplier_id: number;
}
