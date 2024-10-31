import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login-user')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    description: 'User login credentials',
    type: SignInDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  signInUser(@Body() signInDto: SignInDto) {
    console.log(signInDto);
    return this.authService.signInUser(signInDto.email, signInDto.password);
  }

  @Post('login-admin')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    description: 'User login credentials',
    type: SignInDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  signInAdmin(@Body() signInDto: SignInDto) {
    console.log(signInDto);
    return this.authService.signInAdmin(signInDto.email, signInDto.password);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiBody({
    type: RefreshTokenDto,
    description: 'Provide the refresh token to get new tokens',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async refreshTokens(@Body() body: RefreshTokenDto) {
    const { refreshToken } = body;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    return this.authService.refreshTokens(refreshToken);
  }
}
