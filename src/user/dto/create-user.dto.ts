import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInstance,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Password, PasswordInstance } from '../entities/aggregates/password';
import { User } from '../entities/user.entity';

export class CreateUserDto implements Partial<User> {
  @Length(4, 50, { message: 'O login deve ter entre 4 e 50 caracteres' })
  login: string;

  @MinLength(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
  @MaxLength(128, { message: 'A senha deve conter no máximo 128 caracteres' })
  @Transform(({ value }) => new Password(value, PasswordInstance.PLAIN))
  @IsInstance(Password, { message: 'Houve um erro ao salvar sua senha' })
  password: Password;

  @IsEmail({}, { message: 'Digite um email válido' })
  email: string;
}
