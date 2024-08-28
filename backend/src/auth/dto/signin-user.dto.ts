import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
