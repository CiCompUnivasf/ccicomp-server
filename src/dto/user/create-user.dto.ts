import { Exclude, Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsInstance,
  Length,
  ValidateNested,
} from 'class-validator';
import { IsUnique } from '@ccicomp/common/validator';
import { CreatePersonDto } from '@/dto/person';
import { IUser, Password, PasswordInstance, User } from '@/models/user';

export class CreateUserDto implements Partial<IUser> {
  @Length(4, 50, { message: 'O login deve ter entre 4 e 50 caracteres' })
  @IsUnique({ entity: User })
  login: string;

  @Transform(({ value }) => new Password(value, PasswordInstance.PLAIN))
  @IsInstance(Password, { message: 'Houve um erro ao salvar sua senha' })
  @Exclude({ toPlainOnly: true })
  password: Password;

  @IsEmail({}, { message: 'Digite um email válido' })
  @IsUnique({ entity: User })
  email: string;

  @Type(() => CreatePersonDto)
  @IsDefined({ message: 'Uma pessoa deve ser atribuída ao usuário' })
  @ValidateNested()
  person: CreatePersonDto;
}
