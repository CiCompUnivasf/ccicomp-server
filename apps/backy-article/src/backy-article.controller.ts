import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '@ccicomp/storage';
import { BackyArticleService } from './backy-article.service';
import { CreateArticleDto } from './models/article';

@Controller()
export class BackyArticleController {
  constructor(
    private readonly backyArticleService: BackyArticleService,
    private readonly storageService: StorageService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 6_000_000, // ? 6 Megabytes
      },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    const uploaded = await this.storageService.store({
      name: file.originalname,
      folder: 'article',
      content: file.stream || file.buffer, // ? Sempre que stream estiver disponível, vamos utilizar.
      mixNameOnExists: true,
      public: true,
    });

    if (!uploaded.success) {
      throw new HttpException(uploaded.message, HttpStatus.BAD_REQUEST);
    }

    return uploaded;
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    // TODO
  }

  @Get()
  getHello(): string {
    return this.backyArticleService.getHello();
  }
}
