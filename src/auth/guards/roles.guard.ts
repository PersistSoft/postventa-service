import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../model/token.model';

/**
 * Guard used to get roles from JWT and validated if the user has permition on the entpoint.
 * @version 1.0
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    /**
     * Means that the endpoint is public
     */
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const isAuthorized = user.roles.some((role) => roles.includes(role.code));
    if (!isAuthorized) {
      throw new UnauthorizedException('The role is not valid');
    }

    return isAuthorized;
  }
}
