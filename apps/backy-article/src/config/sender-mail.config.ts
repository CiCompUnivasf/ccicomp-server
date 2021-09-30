import { registerAs } from '@nestjs/config';
import { BackyConfig } from './backy-config.enum';

export const senderMailConfig = registerAs(BackyConfig.MAIL_SENDER, () => ({
  mail: process.env.BACKY_MAIL_SENDER,
}));
