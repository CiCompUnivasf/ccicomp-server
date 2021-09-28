import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { storageConfig } from './storage.config';
import { StorageService } from './storage.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [storageConfig],
      cache: true,
    }),
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}