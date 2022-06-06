import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppartmentDto } from '../dtos/appartment.dto';
import { CreateProjectDto } from '../dtos/project.dto';
import { Appartment } from '../entities/appartment.entity';
import { BuildingService } from './building.service';

@Injectable()
export class AppartmentService {
  constructor(
    @InjectRepository(Appartment)
    private appartmentRepository: Repository<Appartment>,
    private buildingService: BuildingService,
  ) {}

  async findByConstructionName(constructionName: string) {
    const appartment = await this.appartmentRepository.findOne({
      where: { constructionName },
      select: ['id', 'constructionName'],
    });
    return appartment;
  }

  async create(appartment: CreateAppartmentDto) {
    const newAppartment = this.appartmentRepository.create(appartment);
    if (appartment.buildingId) {
      const building = await this.buildingService.findById(
        appartment.buildingId,
      );
      newAppartment.building = building;
    }
    return this.appartmentRepository.save(newAppartment);
  }
}
