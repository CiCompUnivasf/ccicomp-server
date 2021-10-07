import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { storageConfig } from './storage.config';
import { StorageService } from './storage.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [storageConfig],
      cache: true,
    }),
  ],
  providers: [
    StorageService,
    Logger,
    {
      provide: S3,
      useFactory(configService: ConfigService) {
        return new S3({
          region: configService.get('storage.region'),
          s3ForcePathStyle: true,
          credentials: {
            accessKeyId: configService.get('storage.accessId'),
            secretAccessKey: configService.get('storage.secret'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
