import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

const MIN_PASSWORD_LENGTH = 5;

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
