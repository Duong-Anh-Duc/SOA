import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  sendNotification(@Body() notificationDto: { recipients: number[]; message: string }) {
    let recipients = notificationDto.recipients
    let message = notificationDto.message
    return this.notificationService.sendNotification(recipients, message);
  }
}