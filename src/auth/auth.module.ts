import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { UserModule } from './../user/user.module';
import config from './../config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.app.jwtSecret,
          signOptions: {
            expiresIn: '15m',
          },
        };
      },
    }),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JWTStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
