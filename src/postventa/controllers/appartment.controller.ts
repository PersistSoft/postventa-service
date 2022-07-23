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
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleCodeEnum } from 'src/auth/model/roles.model';
import {
  CreateAppartmentDto,
  updateAppartmentDto,
} from '../dtos/appartment.dto';
import { AppartmentFilterDto } from '../dtos/appartment.filter.dto';
import { AppartmentService } from '../services/appartment.service';

@ApiTags('Appartments Module')
@Controller('v1/appartments')
export class AppartmentController {
  constructor(private appartmentService: AppartmentService) {}

  @Roles(RoleCodeEnum.ADMIN)
  @Get('/totals')
  getTotals(@Query() params: AppartmentFilterDto) {
    return this.appartmentService.getTotal(params);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Get()
  findAll(@Query() params: AppartmentFilterDto) {
    return this.appartmentService.findAll(params);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Post()
  create(@Body() appartmentDto: CreateAppartmentDto) {
    return this.appartmentService.create(appartmentDto);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.appartmentService.findById(id);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() appartmentDto: updateAppartmentDto,
  ) {
    return this.appartmentService.update(id, appartmentDto);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Delete('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.appartmentService.deleteById(id);
  }
}
