import { Role } from 'src/user/entities/role.entity';

export interface PayloadToken {
  roles: Role[];
  sub: number;
}
