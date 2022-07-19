import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleCodeEnum } from 'src/auth/model/roles.model';
import { AppartmentFilterDto } from '../dtos/appartment.filter.dto';
import { AppartmentService } from '../services/appartment.service';

@ApiTags('Appartments Module')
@Controller('v1/appartments')
export class AppartmentController {
  constructor(private appartmentService: AppartmentService) {}

  @Roles(RoleCodeEnum.ADMIN)
  @Get()
  findAll(@Query() params: AppartmentFilterDto) {
    console.log('dee');
    return this.appartmentService.findAll(params);
  }
}
