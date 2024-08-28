import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginInfo: SignInUserDto): Promise<{ access_token: string }> {
    const user = await this.usersService.getUserByEmail(loginInfo.email);

    if (user?.password !== loginInfo.password)
      throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
