import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  findOne(id: number) {
    return this.repository.findOneOrFail(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOneOrFail(id);

    return this.repository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.repository.findOneOrFail(id);

    return this.repository.softRemove(user);
  }
}
