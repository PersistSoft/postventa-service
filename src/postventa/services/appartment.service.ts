import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppartmentDto } from '../dtos/appartment.dto';
import { Appartment } from '../entities/appartment.entity';
import { BuildingService } from './building.service';
import * as QRCode from 'qrcode';
import { AppartmentFilterDto } from '../dtos/appartment.filter.dto';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Injectable()
export class AppartmentService {
  constructor(
    @InjectRepository(Appartment)
    private appartmentRepository: Repository<Appartment>,
    private buildingService: BuildingService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async findAll(params: AppartmentFilterDto) {
    /* 
        return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .select([
        'user.id',
        'user.email',
        'user.status',
        'user.password',
        'role.code',
      ])
      .where('user.email = :email', { email })
      .andWhere('user.status = :state ', { state })
      .getOne();


                'id',
          'constructionName',
          'salesName',
          'definitiveName',
          'key',
          'qrCode',
    */
    if (params) {
      const { limit, offset } = params;
      return this.appartmentRepository
        .createQueryBuilder('appartment')
        .leftJoinAndSelect('appartment.building', 'building')
        .leftJoinAndSelect('appartment.parking', 'parking')
        .leftJoinAndSelect('appartment.unitStorage', 'unitStorage')
        .leftJoinAndSelect('appartment.appartmentType', 'appartmentType')
        .select([
          'appartment.id',
          'appartment.constructionName',
          'appartment.salesName',
          'appartment.definitiveName',
          'appartment.key',
          'appartment.qrCode',
          'building.name',
          'parking.name',
          'unitStorage.name',
          'appartmentType.name',
        ])
        .take(limit)
        .skip(offset)
        .getMany();
    }

    return this.appartmentRepository.find();
  }

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

    const key = Math.random().toString(36).substring(2, 5);
    const code = `T${1}TEST${key}`.toUpperCase();
    const url = await QRCode.toDataURL(
      `http://${this.configService.app.host}:${this.configService.app.port}/v1/qrcode/${code}/appartment`,
    );

    newAppartment.key = code;
    newAppartment.qrCode = url;

    return this.appartmentRepository.save(newAppartment);
  }
}
