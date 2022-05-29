import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { PermissionController } from './controllers/permission.controller';
import { RoleController } from './controllers/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission])],
  providers: [UserService, RoleService, PermissionService],
  controllers: [UserController, PermissionController, RoleController],
  exports: [UserService],
})
export class UserModule {}
