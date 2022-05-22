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
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserFilterDto } from '../dtos/user.filter.dto';
import { UserService } from '../services/user.service';

@ApiTags('User module')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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
