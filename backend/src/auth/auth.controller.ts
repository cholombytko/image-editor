import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(
    @Body() signUpData: SignUpDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signUp(signUpData);
  }

  @Post('signIn')
  async signIn(
    @Body() signInData: SignInDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(signInData);
  }
}
