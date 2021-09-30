import { registerAs } from '@nestjs/config';

export const mailerConfig = registerAs('ses', () => ({
  region: process.env.SES_REGION,
  accessKey: process.env.SES_ACCESS_KEY,
  secretKey: process.env.SES_CLIENT_SECRET,
}));
