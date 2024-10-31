import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class FilterDto {
  @ApiPropertyOptional({
    description: 'Filter by category name',
  })
  @IsOptional()
  @IsString()
  category_name?: string;

  @ApiPropertyOptional({
    description: 'Filter by parent category ID',
  })
  @IsOptional()
  @IsInt()
  parent_category_id?: number;
}

export class SortDto {
  @ApiPropertyOptional({
    description: 'Field to sort by',
  })
  @IsOptional()
  @IsString()
  sortField?: string;

  @ApiPropertyOptional({
    description: 'Sort order: ASC or DESC',
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
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
