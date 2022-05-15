import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostventaModule } from './postventa/postventa.module';
import { environments } from './environments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        ENV: Joi.string().required(),
      }),
    }),
    UserModule,
    PostventaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
