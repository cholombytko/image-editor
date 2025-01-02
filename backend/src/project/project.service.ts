import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ImagesService } from 'src/images/images.service';
import { ICreateProject } from './interface/create-project.interface';
import { UserService } from 'src/user/user.service';
import { IUpdateProject } from './interface/update-project.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private userService: UserService,
    private imageService: ImagesService,
  ) {}

  async create(payload: ICreateProject): Promise<Project> {
    const user = await this.userService.findOne({ id: payload.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingProject = await this.projectRepository.findOne({
      where: { title: payload.title },
    });
    console.log(existingProject, payload.title);
    if (existingProject) {
      throw new BadRequestException(`Проект з такою назвою вже існує.`);
    }

    const image = await this.imageService.create({ image: payload.image });

    const project = await this.projectRepository.create({
      title: payload.title,
      user,
      image,
    });
    return await this.projectRepository.save(project);
  }

  async findAllByUserId(userId: number): Promise<Project[]> {
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.user', 'user')
      .leftJoinAndSelect('project.image', 'image')
      .where('user.id = :userId', { userId })
      .getMany();

    return projects;
  }

  async findOneById(id: number): Promise<Project> {
    const project = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.user', 'user')
      .leftJoinAndSelect('project.image', 'image')
      .where('project.id = :id', { id })
      .getOne();

    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return project;
  }

  async update(id: number, payload: IUpdateProject): Promise<Project> {
    const project = await this.findOneById(id);

    console.log(payload);

    if (payload.image) {
      await this.imageService.update(project.image.id, {
        image: payload.image,
      });
      project.image.image = payload.image;
    }

    if (payload.title !== undefined) {
      const existingProject = await this.projectRepository.findOne({
        where: { title: payload.title },
      });
      console.log(existingProject, payload.title);
      if (existingProject && existingProject.id !== id) {
        throw new BadRequestException(
          `A project with this title already exists.`,
        );
      }
      project.title = payload.title;
    }

    return this.projectRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.findOneById(id);
    await this.projectRepository.remove(project);
  }
}
