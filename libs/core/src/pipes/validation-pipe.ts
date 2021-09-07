import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  ValidationPipe as BasePipe,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import debug from 'debug';
import { Request } from 'express';

const log = debug('ValidationPipe');

type RequestName = 'create' | 'read' | 'update' | 'delete' | 'custom';

@Injectable({ scope: Scope.REQUEST })
export class ValidationPipe extends BasePipe {
  constructor(@Inject(REQUEST) private readonly request: Request) {
    super({ transform: true, whitelist: true });
    log('piping...');
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const groups = this.setGroups();

    const hasBody = Reflect.ownKeys(value).length > 0;

    // Se não houver body e a requisição não for do tipo read (GET)
    if (!hasBody && !groups.includes('read')) {
      throw new BadRequestException('Nenhum dado foi recebido !');
    }

    log('validation groups', groups);

    super.transformOptions = {
      ...super.transformOptions,
      groups,
    };

    return super.transform(value, metadata);
  }

  // TODO: Adicionar grupos com base no perfil do usuário atual
  private setGroups(): string[] {
    return [this.requestName];
  }

  private get requestName(): RequestName {
    const type = this.request.method.toUpperCase();

    log('request type', type);

    switch (type) {
      case 'POST':
        return 'create';
      case 'GET':
        return 'read';
      case 'PUT':
        return 'update';
      case 'DELETE':
        return 'delete';
      default:
        return 'custom';
    }
  }
}
