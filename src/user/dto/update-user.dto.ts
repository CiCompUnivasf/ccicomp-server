import { OmitType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsInstance, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { Password, PasswordInstance } from '../entities/aggregates/password';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
  'login',
]) {
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
}
