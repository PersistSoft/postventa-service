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
import { CreateParkingDto, UpdateParkingDto } from '../dtos/parking.dto';
import { ParkingFilterDto } from '../dtos/parking.filter.dto';
import { ParkingService } from '../services/parking.service';

@Controller('v1/parkings')
export class ParkingController {
  constructor(private parkingService: ParkingService) {}

  @Roles(RoleCodeEnum.ADMIN)
  @Get()
  findAll(@Query() params: ParkingFilterDto) {
    return this.parkingService.findAll(params);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Post()
  create(@Body() parkingDto: CreateParkingDto) {
    return this.parkingService.create(parkingDto);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.parkingService.findById(id);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() parkingDto: UpdateParkingDto,
  ) {
    return this.parkingService.update(id, parkingDto);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Delete('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.parkingService.deleteById(id);
  }
}
