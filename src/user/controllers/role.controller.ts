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
import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';
import { RoleService } from '../services/role.service';

@ApiTags('Role Module')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.roleService.create(roleDto);
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findById(id);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() roleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, roleDto);
  }

  @Delete('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.deleteById(id);
  }
}
