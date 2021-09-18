import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '@/dto/user';
import { User } from '@/models/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
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
