import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dtos/project.dto';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async findByName(name: string) {
    const project = await this.projectRepository.findOne({
      where: { name },
      select: ['id', 'name'],
    });
    return project;
  }

  create(project: CreateProjectDto) {
    const newProject = this.projectRepository.create(project);
    return this.projectRepository.save(newProject);
  }

  findById(id: number) {
    return this.projectRepository.findOne({ id });
  }
}
