import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '@/models/user';
import { PersonModule } from '@/person';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PersonModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
