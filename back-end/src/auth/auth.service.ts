import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signInUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    if (user.role === 'admin') {
      throw new UnauthorizedException('User not authorized');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const { password, phone_number, role, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      auth: {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '1m',
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: '5m',
        }),
      },
    };
  }

  async signInAdmin(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    if (user.role === 'user') {
      throw new UnauthorizedException('User not authorized');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const { password, phone_number, role, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      auth: {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '1m',
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: '5m',
        }),
      },
    };
  }

  async refreshTokens(refreshToken: string): Promise<any> {
    const decoded = this.jwtService.decode(refreshToken) as any;
    if (!decoded) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeToExpire = decoded.exp - currentTime;

    const payload = await this.jwtService.verifyAsync(refreshToken);

    const newPayload = {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    const newAccessToken = await this.jwtService.signAsync(newPayload, {
      expiresIn: '1m',
    });

    let newRefreshToken: string;

    if (timeToExpire < 86400) {
      newRefreshToken = await this.jwtService.signAsync(newPayload, {
        expiresIn: '5m',
      });
    }

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken || refreshToken,
    };
  }
}
