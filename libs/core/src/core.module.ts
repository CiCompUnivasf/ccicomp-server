import { ClassSerializerInterceptor, Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
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
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class CoreModule {}
