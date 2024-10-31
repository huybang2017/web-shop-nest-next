import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsEnum, Min } from 'class-validator';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FilterDto {
  @ApiPropertyOptional({ description: 'Category ID to filter products' })
  @IsOptional()
  @IsInt()
  category_id?: number;

  @ApiPropertyOptional({
    description: 'Name to filter products by partial match',
  })
  @IsOptional()
  @IsString()
  name?: string;
}

export class SortDto {
  @ApiPropertyOptional({ description: 'Field to sort by (e.g., name, price)' })
  @IsOptional()
  @IsString()
  field: string;

  @ApiPropertyOptional({
    enum: SortOrder,
    description: 'Sort order: ASC or DESC',
  })
  @IsOptional()
  @IsEnum(SortOrder)
  order: SortOrder;
}

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page for pagination',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 10;
}
