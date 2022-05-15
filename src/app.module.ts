import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostventaModule } from './postventa/postventa.module';

@Module({
  imports: [UserModule, PostventaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
