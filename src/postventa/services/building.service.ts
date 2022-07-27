import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuildingDto, UpdateBuildingDto } from '../dtos/building.dto';
import { BuildingFilterDto } from '../dtos/building.filter.dto';
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

  findAll(params?: BuildingFilterDto) {
    if (params?.limit && params?.offset) {
      const { limit, offset } = params;
      return this.buildingRepository.find({
        take: limit,
        skip: offset,
      });
    }

    return this.buildingRepository.find();
  }

  async update(id: number, buildingDto: UpdateBuildingDto) {
    const building = await this.buildingRepository.findOne({ id });

    if (!building) {
      throw new BadRequestException();
    }

    if (buildingDto.projectId) {
      const project = await this.projectService.findById(buildingDto.projectId);
      building.project = project;
    }

    this.buildingRepository.merge(building, buildingDto);
    return this.buildingRepository.save(building);
  }

  deleteById(id: number) {
    return this.buildingRepository.delete(id);
  }
}
