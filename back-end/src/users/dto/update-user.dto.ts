import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'Username of the user', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ description: 'Password of the user', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ description: 'Email of the user', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Role ID of the user', required: false })
  @IsOptional()
  @IsInt()
  role_id?: number;
}
