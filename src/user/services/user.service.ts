import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { RoleService } from './role.service';
import { UserFilterDto } from '../dtos/user.filter.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  findAll(params?: UserFilterDto) {
    if (params) {
      const { limit, offset } = params;
      return this.userRepository.find({
        take: limit,
        skip: offset,
        select: ['id', 'email', 'status'],
      });
    }

    return this.userRepository.find();
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'status'],
    });
    if (!user) {
      throw `User with id: ${id} does't found. `;
    }

    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

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

  findByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .select([
        'user.id',
        'user.email',
        'user.status',
        'user.password',
        'role.code',
      ])
      .where('user.email = :email', { email })
      .getOne();
  }
}
