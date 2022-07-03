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
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleCodeEnum } from 'src/auth/model/roles.model';

import { CreateProjectDto, UpdateProjectDto } from '../dtos/project.dto';
import { ProjectFilterDto } from '../dtos/project.filter.dto';
import { ProjectService } from '../services/project.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Projects module')
@Controller('v1/projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Roles(RoleCodeEnum.ADMIN)
  @Get()
  findAll(@Query() params: ProjectFilterDto) {
    return this.projectService.findAll(params);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Post()
  create(@Body() projectDto: CreateProjectDto) {
    return this.projectService.create(projectDto);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findById(id);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() projectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, projectDto);
  }

  @Roles(RoleCodeEnum.ADMIN)
  @Delete('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteById(id);
  }
}
