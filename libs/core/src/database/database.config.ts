import { registerAs } from '@nestjs/config';
import { LoggerOptions } from 'typeorm';
import { DatabaseType, IDatabaseConfig } from './interfaces';

const createDebugLevel = (): LoggerOptions => {
  const debug = process.env.DB_DEBUG;
  if (debug) {
    if (debug === 'true') return 'all';

    return debug.split(',') as LoggerOptions;
  }

  return false;
};

export const databaseBaseConfig = (): IDatabaseConfig => ({
  type: (process.env.DB_DRIVE as DatabaseType) || 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  logging: createDebugLevel(),
  autoLoadEntities:
    process.env.DB_AUTOLOAD_ENTITIES !== 'false' ||
    process.env.APP_ENV === 'production',
});

export const databaseConfig = registerAs('database', () =>
  databaseBaseConfig(),
);
