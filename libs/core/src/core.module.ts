import { Module, Scope } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from './database';
import { ValidationPipe } from './pipes';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: APP_PIPE,
      scope: Scope.REQUEST,
      useClass: ValidationPipe,
    },
  ],
})
export class CoreModule {}
