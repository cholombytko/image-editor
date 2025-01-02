import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { ICreateImage } from './interfaces/create-image.interface';
import { IUpdateImage } from './interfaces/update-image.interface';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(payload: ICreateImage): Promise<Image> {
    const image = this.imageRepository.create(payload);
    return this.imageRepository.save(image);
  }

  async findOneById(id: number): Promise<Image> {
    return await this.imageRepository.findOne({ where: { id } });
  }

  async update(id: number, payload: IUpdateImage): Promise<Image> {
    await this.imageRepository.update(id, payload);
    return this.findOneById(id);
  }

  async removeById(id: number): Promise<void> {
    const image = await this.findOneById(id);
    await this.imageRepository.remove(image);
  }
}
