import { NestFactory } from '@nestjs/core';
import { BackyArticleModule } from './backy-article.module';

async function bootstrap() {
  const app = await NestFactory.create(BackyArticleModule);
  await app.listen(3000);
}
bootstrap();
