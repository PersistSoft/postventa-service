import { SetMetadata } from '@nestjs/common';
import { RoleCodeEnum } from '../model/roles.model';

export const ROLES_KEY = 'roles';

/**
 * Decorator used to add secutiry on each endpoint and define which roles have access or not.
 * @param roles: RoleCodeEnum List of Roles could access to the endpoint.
 * @version 1.0
 *
 * Example: `@Roles(RoleCodeEnum.ADMIN)`
 */
export const Roles = (...roles: RoleCodeEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
