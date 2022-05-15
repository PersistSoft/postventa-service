import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHealth(): any {
    const env = this.configService.app.env;
    return {
      api: 'PostVenta',
      version: '1.0',
      env,
    };
  }
}
