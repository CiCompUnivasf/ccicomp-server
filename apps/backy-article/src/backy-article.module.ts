import { Module } from '@nestjs/common';
import { CoreModule } from '@ccicomp/core';
import { StorageModule } from '@ccicomp/storage';
import { BackyArticleController } from './backy-article.controller';
import { BackyArticleService } from './backy-article.service';

@Module({
  imports: [CoreModule, StorageModule],
  controllers: [BackyArticleController],
  providers: [BackyArticleService],
})
export class BackyArticleModule {}
