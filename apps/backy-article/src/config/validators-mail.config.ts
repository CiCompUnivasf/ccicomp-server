import { registerAs } from '@nestjs/config';
import { BackyConfig } from './backy-config.enum';

export const validatorsMailConfig = registerAs(
  BackyConfig.MAIL_VALIDATORS,
  () => process.env.BACKY_MAIL_VALIDATORS.split(',').map((mail) => mail.trim()),
);
