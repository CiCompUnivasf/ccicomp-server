import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

// Responsável por versionar as alterações das entidades quando houver alteração
@Injectable()
export class DatabaseDateListener implements EntitySubscriberInterface {
  private readonly logger = new Logger(DatabaseDateListener.name);

  constructor(@InjectConnection() connection: Connection) {
    connection.subscribers.push(this);
    this.logger.log('Subscriber adicionado');
  }

  beforeInsert(event: InsertEvent<any>): void {
    const now = new Date();
    const createdAt = event.metadata.columns.some(
      (c) => c.databaseName === 'created_at',
    );
    const updatedAt = event.metadata.columns.some(
      (c) => c.databaseName === 'updated_at',
    );

    if (createdAt) event.entity.createdAt = now;
    if (updatedAt) event.entity.updatedAt = now;
  }

  beforeUpdate(event: UpdateEvent<any>): void {
    if (event.entity) {
      const now = new Date();

      const updatedAt = event.metadata.columns.some(
        (c) => c.databaseName === 'updated_at',
      );

      if (updatedAt) event.entity.updatedAt = now;
    } else {
      this.logger.warn('@beforeUpdate: Entidade não definida');
    }
  }
}
