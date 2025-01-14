import { Body, Controller } from '@nestjs/common';
import { Post, Get } from '@nestjs/common';
import { WebpushService } from './webpush.service';
import { NotificationPayloadDto, SubscriptionDto } from './webpush.dto';

@Controller('webpush')
export class WebpushController {
  constructor(private readonly webpushService: WebpushService) {}

  @Post('subscribe')
  subscribe(@Body() sub: SubscriptionDto) {
    this.webpushService.saveSubscription(sub);
  }

  @Get('key')
  getKey() {
    return this.webpushService.getPublicKey();
  }

  @Post('sendNotification')
  sendNotification(@Body() notificationPayload: NotificationPayloadDto) {
    return this.webpushService.sendNotification(notificationPayload.message);
  }
}
