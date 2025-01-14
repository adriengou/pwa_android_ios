import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebpushService } from './webpush/webpush.service';
import { WebpushController } from './webpush/webpush.controller';

@Module({
  imports: [],
  controllers: [AppController, WebpushController],
  providers: [AppService, WebpushService],
})
export class AppModule {}
