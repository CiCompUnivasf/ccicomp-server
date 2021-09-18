import { OmitType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import {
  Allow,
  IsInstance,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { UpdatePersonDto } from '../person';
import { CreateUserDto } from './create-user.dto';
import { Password, PasswordInstance } from '@/models/user';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
  'login',
]) {
  @Allow()
  id?: number;

  @ValidateIf((obj: UpdateUserDto) => {
    const hasPassword = !!obj.password;

    if (!hasPassword) Reflect.deleteProperty(obj, 'password');

    return hasPassword;
  })
  @MinLength(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
  @MaxLength(128, { message: 'A senha deve conter no máximo 128 caracteres' })
  @Transform(({ value }) => new Password(value, PasswordInstance.PLAIN))
  @IsInstance(Password, { message: 'Houve um erro ao salvar sua senha' })
  password?: Password;

  @ValidateNested()
  person: UpdatePersonDto;
}
