import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUnitStorageDto,
  UpdateUnitStorageDto,
} from '../dtos/unitStorage.dto';
import { UnitStorageFilterDto } from '../dtos/unitStorage.filter.dto';
import { UnitStorage } from '../entities/unit_storage.entity';

@Injectable()
export class UnitStorageService {
  constructor(
    @InjectRepository(UnitStorage)
    private unitStorageRepository: Repository<UnitStorage>,
  ) {}

  findById(id: number) {
    return this.unitStorageRepository.findOne({ id });
  }

  findByIds(ids: number[]) {
    return this.unitStorageRepository.findByIds(ids);
  }

  create(unitStoraje: CreateUnitStorageDto) {
    const newProject = this.unitStorageRepository.create(unitStoraje);
    return this.unitStorageRepository.save(newProject);
  }

  findAll(params?: UnitStorageFilterDto) {
    if (params?.limit && params?.offset) {
      const { limit, offset } = params;
      return this.unitStorageRepository.find({
        take: limit,
        skip: offset,
      });
    }

    return this.unitStorageRepository.find();
  }

  async update(id: number, appartmentDto: UpdateUnitStorageDto) {
    const appartment = await this.unitStorageRepository.findOne({ id });
    this.unitStorageRepository.merge(appartment, appartmentDto);
    return this.unitStorageRepository.save(appartment);
  }

  deleteById(id: number) {
    return this.unitStorageRepository.delete(id);
  }
}
