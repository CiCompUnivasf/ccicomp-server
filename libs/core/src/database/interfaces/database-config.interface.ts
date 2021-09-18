import { LoggerOptions } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export type DatabaseType = 'postgres' | 'mysql' | 'mariadb';

type SupportedOptions = MysqlConnectionOptions | PostgresConnectionOptions;

export type IDatabaseConfig = SupportedOptions & {
  autoLoadEntities?: boolean;
  logging: LoggerOptions;
};
