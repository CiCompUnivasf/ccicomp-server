import { Injectable, Logger } from '@nestjs/common';
import { SES } from 'aws-sdk';

export interface SesOptions {
  message: string;
  from: string;
  subject: string;
  to: string[];
}

@Injectable()
export class MailerService {
  constructor(private readonly ses: SES, private readonly logger: Logger) {}

  async send(options: SesOptions) {
    this.logger.debug('enviando com as opções', options);

    await this.ses
      .sendEmail(
        {
          Source: options.from,
          Destination: {
            ToAddresses: options.to,
          },
          Message: {
            Subject: {
              Data: options.subject,
            },
            Body: {
              Text: {
                Data: options.message,
              },
            },
          },
        },
        null,
      )
      .promise();
  }
}
