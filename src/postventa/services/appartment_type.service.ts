import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppartmentType } from '../entities/appartment_type.entity';

@Injectable()
export class AppartmentTypeService {
  constructor(
    @InjectRepository(AppartmentType)
    private unitStorageRepository: Repository<AppartmentType>,
  ) {}

  findById(id: number) {
    return this.unitStorageRepository.findOne({ id });
  }
}
