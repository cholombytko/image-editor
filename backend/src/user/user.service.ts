import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ICreateUser } from './interfaces/create-user.interface';
import { IUser } from './interfaces/user.interface';
import { IFindUser } from './interfaces/find-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(payload: ICreateUser) {
    const user = this.userRepository.create(payload);

    return this.userRepository.save(user);
  }

  async findOne(payload: IFindUser): Promise<IUser> {
    const user = this.userRepository.findOne({ where: payload });

    return user;
  }
}
