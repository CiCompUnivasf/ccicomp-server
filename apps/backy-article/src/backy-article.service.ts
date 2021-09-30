import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@ccicomp/notification';
import { BackyConfig } from './config';
import { CreateArticleDto } from './models/article';

@Injectable()
export class BackyArticleService {
  constructor(
    private readonly mailer: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendToValidators(article: CreateArticleDto) {
    const message = [
      'Novo envio de artigo por',
      article.studentName,
      `<${article.mail}>`,
      '.',
      'Para baixar, clique no link abaixo: \n',
      article.uploadedFile,
    ].join(' ');

    const mails: string[] = this.configService.get(BackyConfig.MAIL_VALIDATORS);
    const sender: string = this.configService.get(BackyConfig.MAIL_SENDER).mail;

    await this.mailer.send({
      message,
      from: sender,
      to: mails,
      subject: 'BACKYARDIGANS: Novo artigo enviado !',
    });
  }

  getHello() {
    return {
      hello: 'world',
      tamae: 'god',
    };
  }
}
