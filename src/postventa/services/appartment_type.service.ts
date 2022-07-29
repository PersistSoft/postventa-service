import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAppartmentTypeDto,
  UpdateAppartmentTypeDto,
} from '../dtos/appartmentType.dto';
import { AppartmentTypeFilterDto } from '../dtos/appartmentType.filter.dto';
import { AppartmentType } from '../entities/appartment_type.entity';

@Injectable()
export class AppartmentTypeService {
  constructor(
    @InjectRepository(AppartmentType)
    private appartmentTypeRepository: Repository<AppartmentType>,
  ) {}

  findById(id: number) {
    return this.appartmentTypeRepository.findOne({ id });
  }
  create(project: CreateAppartmentTypeDto) {
    const newProject = this.appartmentTypeRepository.create(project);
    return this.appartmentTypeRepository.save(newProject);
  }

  findAll(params?: AppartmentTypeFilterDto) {
    if (params?.limit && params?.offset) {
      const { limit, offset } = params;
      return this.appartmentTypeRepository.find({
        take: limit,
        skip: offset,
      });
    }

    return this.appartmentTypeRepository.find();
  }

  async update(id: number, appartmentDto: UpdateAppartmentTypeDto) {
    const appartment = await this.appartmentTypeRepository.findOne({ id });
    this.appartmentTypeRepository.merge(appartment, appartmentDto);
    return this.appartmentTypeRepository.save(appartment);
  }

  deleteById(id: number) {
    return this.appartmentTypeRepository.delete(id);
  }
}
