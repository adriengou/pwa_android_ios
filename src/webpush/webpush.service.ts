import { Injectable } from '@nestjs/common';
import { vapidKey } from './vapidkey';
import { SubscriptionDto } from './webpush.dto';
import * as webPush from 'web-push';

@Injectable()
export class WebpushService {
  private clientSubscriptions: SubscriptionDto[] = [];

  getPublicKey() {
    console.log('Public key requested');
    return vapidKey.public;
  }

  saveSubscription(subscription: SubscriptionDto) {
    this.clientSubscriptions.push(subscription);
    console.log('Subscription saved', subscription);
  }

  async sendNotification(message: string) {
    for (const client of this.clientSubscriptions) {
      try {
        await webPush.sendNotification(client, message);
        console.log('Notification sent to');
      } catch (error) {
        console.error('Error sending notification', error);
      }
    }
  }
}
