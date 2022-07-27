import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    console.log('ids: ', ids);
    
    return this.parkingRepository.findByIds(ids);
  }
}
