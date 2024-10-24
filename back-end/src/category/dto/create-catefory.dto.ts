import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty()
  @IsString()
  category_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  parent_category_id?: number;
}
