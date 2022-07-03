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
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserFilterDto } from '../dtos/user.filter.dto';
import { UserService } from '../services/user.service';

import { Public } from '../../auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleCodeEnum } from 'src/auth/model/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('User module')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //@Public()
  @Roles(RoleCodeEnum.ADMIN)
  @Public()
  @Get()
  findAll(@Query() params: UserFilterDto) {
    return this.userService.findAll(params);
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.userService.update(id, userDto);
  }

  @Delete('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
  }
}
