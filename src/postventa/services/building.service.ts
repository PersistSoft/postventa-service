import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuildingDto } from '../dtos/building.dto';
import { Building } from '../entities/building.entity';
import { ProjectService } from './project.service';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,
    private projectService: ProjectService,
  ) {}

  async findByName(name: string) {
    return this.buildingRepository.findOne({
      where: { name },
      select: ['id', 'name'],
    });
  }

  findByNameAndProjectId(name: string, projectId: number) {
    return this.buildingRepository
      .createQueryBuilder('buildings')
      .leftJoinAndSelect('buildings.project', 'project')
      .andWhere(`buildings.project = ${projectId}`)
      .andWhere(`LOWER(buildings.name) = LOWER('${name}')`)
      .getOne();
  }

  async create(building: CreateBuildingDto) {
    const newBuilding = this.buildingRepository.create(building);

    if (building.projectId) {
      const project = await this.projectService.findById(building.projectId);
      newBuilding.project = project;
    }

    return this.buildingRepository.save(newBuilding);
  }

  findById(id: number) {
    return this.buildingRepository.findOne({ id });
  }

  findByPrjectId(id: number) {
    return this.buildingRepository
      .createQueryBuilder('buildings')
      .leftJoinAndSelect('buildings.project', 'project')
      .where(`buildings.project = ${id}`)
      .getMany();
  }
}
