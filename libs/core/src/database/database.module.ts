import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseDateListener } from './database-date.listener';
import { databaseConfig } from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      async useFactory(configService: ConfigService) {
        const logger = new Logger('DatabaseModule');

        const cache = configService.get('database.cache');
        const synchronize =
          process.env.APP_ENV !== 'production' &&
          process.env.DB_SYNC_SCHEMA === 'true';

        const config = {
          ...configService.get('database'),
          synchronize,
          namingStrategy: new SnakeNamingStrategy(),
        };

        const message: string = [
          'Criando nova conexão:',
          `${config.host}:${config.port} |`,
          `${config.username}:${config.password} |`,
          `${config.database}:${config.schema} |`,
          `cache: ${!!cache}`,
        ].join(' ');

        logger.log(message);

        logger.log(`Sincronizar schema: ${synchronize ? 'Sim' : 'Não'}`);

        return config;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseDateListener],
})
export class DatabaseModule {}
