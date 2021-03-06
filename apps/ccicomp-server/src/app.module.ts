import { Module } from '@nestjs/common';
import { CoreModule } from '@ccicomp/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user';

@Module({
  imports: [CoreModule.forDatabase(), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
