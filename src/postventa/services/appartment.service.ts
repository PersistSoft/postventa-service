import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  CreateAppartmentDto,
  updateAppartmentDto,
} from '../dtos/appartment.dto';
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

      let query = this.appartmentRepository
        .createQueryBuilder('appartment')
        .leftJoinAndSelect('appartment.parkings', 'parking')
        .leftJoinAndSelect('appartment.unitStorages', 'unitStorage')
        .leftJoinAndSelect('appartment.appartmentType', 'appartmentType')
        .take(limit)
        .skip(offset);

      if (params.buildingId) {
        query = query.andWhere(`appartment.building = ${params.buildingId}`);
      }

      if (params.hasPaskings === 'true') {
        query = query.andWhere(`parking IS NOT NULL`);
      }

      if (params.hasUnitStorages === 'true') {
        query = query.andWhere(`appartmentType IS NOT NULL`);
      }

      if (params.delivered === 'true') {
        query = query.andWhere(`appartment.deliveryDate IS NOT NULL`);
      }

      return query.getMany();
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

  async findByConstructionNameAndBuildingId(
    constructionName: string,
    buildingId: number,
  ) {
    return this.appartmentRepository
      .createQueryBuilder('appartment')
      .leftJoinAndSelect('appartment.building', 'building')
      .andWhere(`appartment.building = ${buildingId}`)
      .andWhere(
        `LOWER(appartment.constructionName) = LOWER('${constructionName}')`,
      )
      .getOne();
  }

  async create(appartment: CreateAppartmentDto) {
    const newAppartment = this.appartmentRepository.create(appartment);
    newAppartment.building = await this.buildingService.findById(
      appartment.buildingId,
    );

    newAppartment.parkings = await this.parkingService.findByIds(
      appartment.parkingIds,
    );

    newAppartment.unitStorages = await this.unitStorageService.findByIds(
      appartment.unitStorageIds,
    );

    newAppartment.appartmentType = await this.appartmentTypeService.findById(
      appartment.appartmentTypeId,
    );

    const { code, url } = await this.generateQrCode(newAppartment);

    newAppartment.key = code;
    newAppartment.qrCode = url;

    return await this.appartmentRepository.save(newAppartment);
  }

  /**
   * Generate code and qrcode of appartments
   */
  private async generateQrCode(newAppartment: Appartment) {
    const key = Math.random().toString(36).substring(2, 5);
    let code = `${newAppartment?.building?.name}_${key}`.toUpperCase();

    code = code.replace(/\s/g, '');

    const url = await QRCode.toDataURL(
      `http://${this.configService.app.host}:${this.configService.app.port}/v1/qrcode/${code}/appartment`,
    );

    return { code, url };
  }

  findById(id: number) {
    return this.appartmentRepository.findOne({ id });
  }

  async update(id: number, appartmentDto: updateAppartmentDto) {
    const appartment = await this.appartmentRepository.findOne({ id });
    this.appartmentRepository.merge(appartment, appartmentDto);

    appartment.building = await this.buildingService.findById(
      appartmentDto.buildingId,
    );

    /*appartment.parking = await this.parkingService.findById(
      appartmentDto.parkingId,
    );*/
    /*
    appartment.unitStorage = await this.unitStorageService.findById(
      appartmentDto.unitStorageId,
    );
    */
    appartment.appartmentType = await this.appartmentTypeService.findById(
      appartmentDto.appartmentTypeId,
    );

    return this.appartmentRepository.save(appartment);
  }

  deleteById(id: number) {
    return this.appartmentRepository.delete(id);
  }

  /**
   * Get totals of appartments
   * @param params
   * @returns
   */
  async getTotal(params) {
    if (params && params.buildingId) {
      const appartments = await this.appartmentRepository
        .createQueryBuilder('appartment')
        .leftJoinAndSelect('appartment.building', 'building')
        .where(`appartment.building = ${params.buildingId}`)
        .getCount();

      const delivered = await this.appartmentRepository
        .createQueryBuilder('appartment')
        .where(`appartment.delivery_date is not null`)
        .andWhere(`appartment.building = ${params.buildingId}`)
        .getCount();

      const parkings = await this.appartmentRepository
        .createQueryBuilder('appartment')
        .where(`appartment.parking is not null`)
        .andWhere(`appartment.building = ${params.buildingId}`)
        .getCount();

      const unitsStorage = await this.appartmentRepository
        .createQueryBuilder('appartment')
        .where(`appartment.unitStorage is not null`)
        .andWhere(`appartment.building = ${params.buildingId}`)
        .getCount();

      return {
        appartments,
        delivered,
        parkings,
        unitsStorage,
      };
    }
  }
}
