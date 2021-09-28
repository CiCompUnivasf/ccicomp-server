import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from './person.service';
import { Person } from '@/models/person';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [],
  providers: [PersonService],
})
export class PersonModule {}
