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
  CreateAppartmentTypeDto,
  UpdateAppartmentTypeDto,
} from '../dtos/appartmentType.dto';
import { ProjectFilterDto } from '../dtos/project.filter.dto';
import { AppartmentTypeService } from '../services/appartment_type.service';

@Controller('v1/appartment-types')
export class AppartmentTypeController {
  constructor(private appartmentType: AppartmentTypeService) {}

  @Roles(RoleCodeEnum.ADMIN)
  @Get()
  findAll(@Query() params: ProjectFilterDto) {
    return this.appartmentType.findAll(params);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Post()
  create(@Body() appartmentTypeDto: CreateAppartmentTypeDto) {
    return this.appartmentType.create(appartmentTypeDto);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.appartmentType.findById(id);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() projectDto: UpdateAppartmentTypeDto,
  ) {
    return this.appartmentType.update(id, projectDto);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Delete('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.appartmentType.deleteById(id);
  }
}
