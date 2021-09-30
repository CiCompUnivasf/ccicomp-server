import { Module } from '@nestjs/common';
import { CoreModule } from '@ccicomp/core';
import { NotificationModule } from '@ccicomp/notification';
import { StorageModule } from '@ccicomp/storage';
import { BackyArticleController } from './backy-article.controller';
import { BackyArticleService } from './backy-article.service';
import { BackyConfigModule } from './config';

@Module({
  imports: [
    CoreModule,
    BackyConfigModule,
    StorageModule,
    NotificationModule,
    BackyConfigModule,
  ],
  controllers: [BackyArticleController],
  providers: [BackyArticleService],
})
export class BackyArticleModule {}
