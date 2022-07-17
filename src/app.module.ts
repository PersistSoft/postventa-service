import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostventaModule } from './postventa/postventa.module';
import { environments } from './environments';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      envFilePath: 'dev.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        ENV: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    UserModule,
    PostventaModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
