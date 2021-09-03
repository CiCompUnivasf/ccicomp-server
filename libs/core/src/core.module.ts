import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { DatabaseModule } from './database';

@Module({
  imports: [DatabaseModule],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
