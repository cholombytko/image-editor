import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { UserService } from 'src/user/user.service';
import { IAuthData } from '../interfaces/auth-data.interface';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { IncorrectPasswordException } from '../exceptions/incorrect-password.exception';
import { IAuthResponse } from '../interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private userService: UserService,
  ) {}

  async signUp(signUpData: IAuthData): Promise<IAuthResponse> {
    const user = await this.userService.findOne({
      email: signUpData.email,
    });

    if (user) throw new UserAlreadyExistsException();

    const hash = await this.passwordService.hash(signUpData.password);

    const newUser = await this.userService.create({
      name: signUpData.name,
      email: signUpData.email,
      password: hash,
    });

    const payload = { name: newUser.name, id: newUser.id };

    const token = await this.jwtService.signAsync(payload);

    console.log(
      `Created user:
      name: ${signUpData.name}
      email: ${signUpData.email}
      hashed password: ${hash}`,
    );

    return { access_token: token, userId: newUser.id };
  }

  async signIn(signInData: IAuthData): Promise<IAuthResponse> {
    const user = await this.userService.findOne({
      email: signInData.email,
    });

    if (!user) throw new UserNotFoundException();

    const isPasswordCorrect = await this.passwordService.compare(
      signInData.password,
      user.password,
    );

    if (!isPasswordCorrect) throw new IncorrectPasswordException();

    const payload = { name: user.name, id: user.id };

    const token = await this.jwtService.signAsync(payload);

    console.log(
      `Authenticated user:
      email: ${signInData.email}`,
    );

    return { access_token: token, userId: user.id };
  }
}
