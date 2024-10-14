import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  Length,
} from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({
    description: 'The name of the supplier',
    example: 'Supplier Name',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    description: 'The contact email of the supplier',
    example: 'supplier@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  @Length(1, 100)
  contact_email?: string;

  @ApiProperty({
    description: 'The phone number of the supplier',
    example: '+123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  phone_number?: string;
}
