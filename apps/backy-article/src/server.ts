import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { BackyArticleModule } from './backy-article.module';

declare const module: any;

export async function createServer(): Promise<INestApplication> {
  const app = await NestFactory.create(BackyArticleModule);
  app.enableCors();

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  return app;
}
