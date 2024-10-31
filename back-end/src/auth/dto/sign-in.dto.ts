import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'admin@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    description: 'The password of the user (4 to 20 characters)',
    example: 'admin',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(4, 20, { message: 'Password must be between 4 and 20 characters' })
  password: string;
}
