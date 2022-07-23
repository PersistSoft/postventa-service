import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
