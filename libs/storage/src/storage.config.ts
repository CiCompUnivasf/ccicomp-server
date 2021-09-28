import { registerAs } from '@nestjs/config';

export const storageConfig = registerAs('storage', () => ({
  region: process.env.S3_REGION,
  bucket: process.env.S3_BUCKET,
  accessId: process.env.S3_ACCESS_KEY,
  secret: process.env.S3_CLIENT_SECRET,
}));
