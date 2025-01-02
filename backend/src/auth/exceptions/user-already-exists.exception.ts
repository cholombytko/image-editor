import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
  constructor(error?: string) {
    super('Такий користувач вже існує', error);
  }
}
