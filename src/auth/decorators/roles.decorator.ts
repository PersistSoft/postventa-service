import { SetMetadata } from '@nestjs/common';
import { RoleCodeEnum } from '../model/roles.model';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: RoleCodeEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
