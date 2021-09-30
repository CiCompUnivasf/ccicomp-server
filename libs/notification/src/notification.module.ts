import { Module } from '@nestjs/common';
import { MailerModule } from './mailer';
import { NotificationService } from './notification.service';

@Module({
  imports: [MailerModule],
  providers: [NotificationService],
  exports: [NotificationService, MailerModule],
})
export class NotificationModule {}
