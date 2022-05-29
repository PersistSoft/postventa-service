import { Role } from 'src/user/entities/role.entity';

/**
 * Paylod token used to create the JWT
 */
export interface PayloadToken {
  roles: Role[];
  sub: number;
}
