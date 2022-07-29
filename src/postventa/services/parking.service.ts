import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParkingDto, UpdateParkingDto } from '../dtos/parking.dto';
import { ParkingFilterDto } from '../dtos/parking.filter.dto';
import { Parking } from '../entities/parking.entity';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(Parking)
    private parkingRepository: Repository<Parking>,
  ) {}

  findById(id: number) {
    return this.parkingRepository.findOne({ id });
  }

  findByIds(ids: number[]) {
    return this.parkingRepository.findByIds(ids);
  }

  create(parking: CreateParkingDto) {
    const newProject = this.parkingRepository.create(parking);
    return this.parkingRepository.save(newProject);
  }

  findAll(params?: ParkingFilterDto) {
    if (params?.limit && params?.offset) {
      const { limit, offset } = params;
      return this.parkingRepository.find({
        take: limit,
        skip: offset,
      });
    }

    return this.parkingRepository.find();
  }

  async update(id: number, appartmentDto: UpdateParkingDto) {
    const appartment = await this.parkingRepository.findOne({ id });
    this.parkingRepository.merge(appartment, appartmentDto);
    return this.parkingRepository.save(appartment);
  }

  deleteById(id: number) {
    return this.parkingRepository.delete(id);
  }
}
