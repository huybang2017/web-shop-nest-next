import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Sign in with email and password
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, pass); // Reuse validateUser function

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Validate user by email and password
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password, ...result } = user; // Return user data excluding password
    return result;
  }

  // Handle refresh token
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.usersService.findOneByid(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate new access token
      const newAccessToken = this.jwtService.sign({
        email: user.email,
        sub: user.id,
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
