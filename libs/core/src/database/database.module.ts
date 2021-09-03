import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseDateListener } from './database-date.listener';
import { databaseConfig } from './database.config';
import { DatabaseType } from './interfaces';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(config: ConfigService) {
        const logger = new Logger('DatabaseModule');

        const type: DatabaseType = config.get('database.type');
        const host: string = config.get('database.host');
        const port: number = config.get('database.port');
        const username: string = config.get('database.username');
        const password: string = config.get('database.password');
        const schema: string = config.get('database.schema') || 'public';
        const database: string = config.get('database.database');
        const logging: LoggerOptions = config.get('database.logging');
        const autoLoadEntities = config.get('database.autoLoadEntities');
        const cache = config.get('database.cache');
        const synchronize =
          process.env.APP_ENV !== 'production' &&
          process.env.DB_SYNC_SCHEMA === 'true';

        logger.log(
          `Criando nova conexão: ${host}:${port} | ${username}:${password} | ${database}:${schema} | cache: ${!!cache}`,
        );

        logger.log(`Sincronizar schema: ${synchronize ? 'Sim' : 'Não'}`);

        return {
          type,
          host,
          port,
          username,
          password,
          database,
          schema,
          cache,
          autoLoadEntities,
          logging,
          synchronize,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseDateListener],
})
export class DatabaseModule {}
