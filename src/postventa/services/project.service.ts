import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/project.dto';
import { ProjectFilterDto } from '../dtos/project.filter.dto';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async findByName(name: string) {
    const project = await this.projectRepository.findOne({
      where: { name },
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

  findAll(params?: ProjectFilterDto) {
    if (params?.limit && params?.offset) {
      const { limit, offset } = params;
      return this.projectRepository.find({
        take: limit,
        skip: offset,
      });
    }

    return this.projectRepository.find();
  }

  async update(id: number, projectDto: UpdateProjectDto) {
    const user = await this.projectRepository.findOne({ id });
    this.projectRepository.merge(user, projectDto);
    return this.projectRepository.save(user);
  }

  deleteById(id: number) {
    return this.projectRepository.delete(id);
  }
}
