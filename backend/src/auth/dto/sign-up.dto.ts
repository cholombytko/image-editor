import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

const MIN_PASSWORD_LENGTH = 5;

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
