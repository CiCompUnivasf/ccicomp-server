import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { senderMailConfig } from './sender-mail.config';
import { validatorsMailConfig } from './validators-mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [validatorsMailConfig, senderMailConfig],
      cache: true,
    }),
  ],
  exports: [ConfigModule],
})
export class BackyConfigModule {}
