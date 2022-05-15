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
        API_KEY: Joi.number().required(),
        DATA_BASE_NAME: Joi.string().required(),
        DATA_BASE_PORT: Joi.number().required(),
      }),
    }),
    UserModule,
    PostventaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
