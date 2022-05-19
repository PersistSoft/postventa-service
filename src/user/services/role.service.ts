import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';
import { Role } from '../entities/role.entity';
import { PermissionService } from './permission.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private permissionService: PermissionService,
  ) {}

  findAll() {
    return this.roleRepository.find();
  }

  async findById(id: number) {
    const role = await this.roleRepository.findOne(id);
    if (!role) {
      throw `Role with id: ${id} does't found. `;
    }

    return role;
  }

  async create(role: CreateRoleDto) {
    const newRole = this.roleRepository.create(role);

    if (role.permissionIds) {
      const permissions = await this.permissionService.findByIds(
        role.permissionIds,
      );
      newRole.permissions = permissions;
    }

    return this.roleRepository.save(newRole);
  }

  deleteById(id: number) {
    return this.roleRepository.delete(id);
  }

  async update(id: number, roleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne(id);
    this.roleRepository.merge(role, roleDto);
    return this.roleRepository.save(role);
  }

  findByIds(ids: number[]) {
    return this.roleRepository.findByIds(ids);
  }
}
