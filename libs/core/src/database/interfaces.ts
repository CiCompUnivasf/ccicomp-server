import { LoggerOptions } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export type DatabaseType = 'postgres' | 'mysql' | 'mariadb';

export type IDatabaseConfig =
  | MysqlConnectionOptions
  | (PostgresConnectionOptions & {
      autoLoadEntities?: boolean;
      logging: LoggerOptions;
    });
