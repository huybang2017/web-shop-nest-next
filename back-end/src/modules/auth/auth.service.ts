import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { reponse } from 'src/utlis/type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<reponse> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    console.log(user.password, pass);
    console.log(process.env.JWT_SECRET);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const { password, ...userWithoutPassword } = user;
    return {
      statusCode: HttpStatus.OK,
      message: 'User logged in successfully',
      data: [
        {
          ...userWithoutPassword,
          access_token: await this.jwtService.signAsync(payload),
        },
      ],
    };
  }
}
