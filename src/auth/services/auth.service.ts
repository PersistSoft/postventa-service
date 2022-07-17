import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../../user/services/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { PayloadToken } from '../model/token.model';
import { UserStateEnum } from 'src/user/enums/user_state.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    if (!email) {
      throw new UnauthorizedException('Not Allow');
    }

    const user = await this.userService.findByEmailAndState(
      email,
      UserStateEnum.Active,
    );

    if (!user || !password) {
      throw new UnauthorizedException('Not Allow');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return this.generateJwt(user);
    }

    return null;
  }

  generateJwt(user: User) {
    const payload: PayloadToken = {
      roles: user.roles,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
