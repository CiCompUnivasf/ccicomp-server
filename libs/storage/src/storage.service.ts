import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { randomString } from '@ccicomp/common/utils';
import {
  GetObject,
  StoredObject,
  StoreNewObject,
  StoreNewObjectResult,
} from './models';

@Injectable()
export class StorageService {
  constructor(
    private readonly s3: S3,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  public async store(options: StoreNewObject): Promise<StoreNewObjectResult> {
    const selectedBucket = this.getBucket(options);

    const fileExists = await this.objectExists(options);

    const filename = this.getFilename(options);

    if (fileExists && !options.override && !options.mixNameOnExists) {
      return {
        success: false,
        message: 'Arquivo já existe',
      };
    } else if (fileExists && options.mixNameOnExists) {
      // ? Caso o arquivo já exista, criamos o novo nome se permitido.

      this.logger.log('Arquivo já existe, criando novo mixin');

      const extension = options.name.split('.').pop();
      return this.store({
        ...options,
        name: [options.name, randomString(4), randomString(4)]
          .join('-')
          .concat(`.${extension}`),
      });
    }

    const data = await this.s3
      .upload({
        Bucket: selectedBucket,
        Body: options.content,
        Key: this.getFilename(options),
        ACL: options.public ? 'public-read' : 'private',
      })
      .promise();

    this.logger.debug(`arquivo criado: ${filename}`);

    return {
      success: true,
      data,
    };
  }

  public async getObject(options: GetObject): Promise<StoredObject | false> {
    const filename = this.getFilename(options);

    this.logger.debug(`obtendo arquivo: ${filename}`);

    const stored = await this.s3
      .getObject({
        Bucket: this.getBucket(options),
        Key: filename,
      })
      .promise();

    this.logger.debug(`obtido: ${filename}`);

    if (!stored.Body) {
      return false;
    }

    return {
      name: options?.name,
      content: stored.Body,
      contentType: stored.ContentType,
    };
  }

  public async objectExists(options: GetObject): Promise<boolean> {
    try {
      const has = await this.getObject(options);

      return !!has;
    } catch (e) {
      if (e.message.includes('The specified key does not exist')) {
        return false;
      }

      throw e;
    }
  }

  private getFilename(options?: {
    folder?: string;
    name: string;
    absolut?: boolean;
  }) {
    if (options.absolut) {
      return options.name;
    }

    return [options.folder || this.createUploadDir(), options.name].join('/');
  }

  private createUploadDir(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getUTCMonth();

    return ['uploads', year, month].join('/');
  }

  private getBucket(options?: { bucket?: string }): string {
    return options?.bucket || this.configService.get('storage.bucket');
  }
}
