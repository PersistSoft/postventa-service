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
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleCodeEnum } from 'src/auth/model/roles.model';
import { CreateBuildingDto, UpdateBuildingDto } from '../dtos/building.dto';
import { BuildingFilterDto } from '../dtos/building.filter.dto';
import { BuildingService } from '../services/building.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/buildings')
export class BuildingController {
  constructor(private buildingService: BuildingService) {}
  @Roles(RoleCodeEnum.ADMIN)
  @Get()
  findAll(@Query() params: BuildingFilterDto) {
    return this.buildingService.findAll(params);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Post()
  create(@Body() buildingDto: CreateBuildingDto) {
    return this.buildingService.create(buildingDto);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.buildingService.findById(id);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() buildingDto: UpdateBuildingDto,
  ) {
    return this.buildingService.update(id, buildingDto);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Delete('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.buildingService.deleteById(id);
  }
}
