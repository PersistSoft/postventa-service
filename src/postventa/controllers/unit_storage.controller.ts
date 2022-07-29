import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleCodeEnum } from 'src/auth/model/roles.model';
import {
  CreateUnitStorageDto,
  UpdateUnitStorageDto,
} from '../dtos/unitStorage.dto';
import { UnitStorageFilterDto } from '../dtos/unitStorage.filter.dto';
import { UnitStorageService } from '../services/unit_storage.service';

@Controller('v1/unit-storage')
export class UnitStorageController {
  constructor(private unitStorageService: UnitStorageService) {}

  @Roles(RoleCodeEnum.ADMIN)
  @Get()
  findAll(@Query() params: UnitStorageFilterDto) {
    return this.unitStorageService.findAll(params);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Post()
  create(@Body() unitStorageDto: CreateUnitStorageDto) {
    return this.unitStorageService.create(unitStorageDto);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.unitStorageService.findById(id);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() unitStorageDto: UpdateUnitStorageDto,
  ) {
    return this.unitStorageService.update(id, unitStorageDto);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Delete('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.unitStorageService.deleteById(id);
  }
}
