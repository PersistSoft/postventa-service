import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
} from '../dtos/permission.dto';
import { PermissionService } from '../services/permission.service';

@ApiTags('Permission Role')
@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Post()
  create(@Body() permissionDto: CreatePermissionDto) {
    return this.permissionService.create(permissionDto);
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.findById(id);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() permissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(id, permissionDto);
  }

  @Delete('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.deleteById(id);
  }
}
