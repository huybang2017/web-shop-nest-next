import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({
    description: 'URL of the image',
    example: 'https://example.com/image.jpg',
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ description: 'ID of the imageable entity', example: 1 })
  @IsNotEmpty()
  @IsInt()
  imageable_id: number;

  @ApiProperty({
    description: 'Type of the imageable entity',
    example: 'Product',
  })
  @IsNotEmpty()
  @IsString()
  imageable_type: string;

  @ApiProperty({
    description: 'Type of the image (optional)',
    example: 'thumbnail',
    required: false,
  })
  @IsOptional()
  @IsString()
  type?: string;
}
