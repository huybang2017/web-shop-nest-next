import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDecimal, IsDate } from 'class-validator';

export class CreatePromotionDto {
  @ApiProperty({ example: 'Summer Sale' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Discount on summer collection' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 0.15 })
  @IsDecimal()
  discount_rate: number;

  @ApiProperty({ example: '2024-07-01T00:00:00Z' })
  @IsDate()
  start_date: Date;

  @ApiProperty({ example: '2024-08-01T23:59:59Z' })
  @IsDate()
  end_date: Date;
}
