import { Test, TestingModule } from '@nestjs/testing';
import { BackyArticleController } from './backy-article.controller';
import { BackyArticleService } from './backy-article.service';

describe('BackyArticleController', () => {
  let backyArticleController: BackyArticleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BackyArticleController],
      providers: [BackyArticleService],
    }).compile();

    backyArticleController = app.get<BackyArticleController>(BackyArticleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(backyArticleController.getHello()).toBe('Hello World!');
    });
  });
});
