import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SES } from 'aws-sdk';
import { mailerConfig } from './config';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mailerConfig],
      cache: true,
    }),
  ],
  providers: [
    MailerService,
    Logger,
    {
      provide: SES,
      useFactory(configService: ConfigService) {
        return new SES({
          region: configService.get('ses.region'),
          credentials: {
            accessKeyId: configService.get('ses.accessKey'),
            secretAccessKey: configService.get('ses.secretKey'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [MailerService],
})
export class MailerModule {}
