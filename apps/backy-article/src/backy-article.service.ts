import { Injectable } from '@nestjs/common';

@Injectable()
export class BackyArticleService {
  getHello(): string {
    return 'Hello World!';
  }
}
