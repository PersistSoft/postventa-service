import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
} from '../dtos/permission.dto';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  findAll() {
    return this.permissionRepository.find();
  }

  async findById(id: number) {
    const user = await this.permissionRepository.findOne({ id: id });
    if (!user) {
      throw `Permission with id: ${id} does't found. `;
    }

    return user;
  }

  create(permission: CreatePermissionDto) {
    return this.permissionRepository.save(permission);
  }

  deleteById(id: number) {
    return this.permissionRepository.delete(id);
  }

  async update(id: number, permissionDto: UpdatePermissionDto) {
    const permission = await this.permissionRepository.findOne({ id });
    this.permissionRepository.merge(permission, permissionDto);
    return this.permissionRepository.save(permission);
  }

  findByIds(ids: number[]) {
    return this.permissionRepository.findByIds(ids);
  }
}
