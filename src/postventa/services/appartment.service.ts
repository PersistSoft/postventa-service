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
import { ParkingService } from './parking.service';
import { UnitStorageService } from './unit_storage.service';
import { AppartmentTypeService } from './appartment_type.service';

@Injectable()
export class AppartmentService {
  constructor(
    @InjectRepository(Appartment)
    private appartmentRepository: Repository<Appartment>,
    private buildingService: BuildingService,
    private parkingService: ParkingService,
    private unitStorageService: UnitStorageService,
    private appartmentTypeService: AppartmentTypeService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async findAll(params: AppartmentFilterDto) {
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
    newAppartment.building = await this.buildingService.findById(
      appartment.buildingId,
    );

    newAppartment.parking = await this.parkingService.findById(
      appartment.parkingId,
    );

    newAppartment.unitStorage = await this.unitStorageService.findById(
      appartment.unitStorageId,
    );

    newAppartment.appartmentType = await this.appartmentTypeService.findById(
      appartment.appartmentTypeId,
    );

    const { code, url } = await this.generateQrCode(newAppartment);

    newAppartment.key = code;
    newAppartment.qrCode = url;

    return this.appartmentRepository.save(newAppartment);
  }

  /**
   * Generate code and qrcode of appartments
   */
  private async generateQrCode(newAppartment: Appartment) {
    const key = Math.random().toString(36).substring(2, 5);
    let code = `${newAppartment?.building?.name}_${key}`.toUpperCase();

    code = code.replace(/\s/g, '');
    console.log('code: ', code);

    const url = await QRCode.toDataURL(
      `http://${this.configService.app.host}:${this.configService.app.port}/v1/qrcode/${code}/appartment`,
    );

    return { code, url };
  }
}
