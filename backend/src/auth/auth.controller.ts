import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signIn(signInUserDto);
  }
}
