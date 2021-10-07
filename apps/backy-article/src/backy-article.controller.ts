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
    private readonly service: BackyArticleService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  async hello() {
    return this.service.getHello();
  }

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
    const mimes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];

    if (!mimes.includes(file.mimetype)) {
      throw new HttpException(
        'Apenas arquivos DOCX são aceitos',
        HttpStatus.BAD_REQUEST,
      );
    }

    const uploaded = await this.storageService.store({
      name: file.originalname,
      folder: 'article',
      content: file.buffer,
      mixNameOnExists: true,
      public: true,
      mimeType: file.mimetype,
    });

    if (!uploaded.success) {
      throw new HttpException(uploaded.message, HttpStatus.BAD_REQUEST);
    }

    return {
      message: uploaded.message,
      data: {
        url: uploaded.data.Location,
      },
    };
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    await this.service.sendToValidators(createArticleDto);

    return {
      success: true,
      message: 'Enviado com sucesso !',
    };
  }
}
