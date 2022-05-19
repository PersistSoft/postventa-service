import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { RoleService } from './role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({ id: id });
    if (!user) {
      throw `User with id: ${id} does't found. `;
    }

    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);

    if (user.roleIds) {
      const roles = await this.roleService.findByIds(user.roleIds);
      newUser.roles = roles;
    }

    return this.userRepository.save(newUser);
  }

  deleteById(id: number) {
    return this.userRepository.delete(id);
  }

  async update(id: number, userDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ id });
    this.userRepository.merge(user, userDto);
    return this.userRepository.save(user);
  }
}
