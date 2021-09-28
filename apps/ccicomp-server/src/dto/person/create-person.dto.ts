import { IsDateString, IsOptional, IsString, Length } from 'class-validator';
import { IPerson } from '@/models/person';

export class CreatePersonDto implements Partial<IPerson> {
  @IsString({ message: 'Você deve inserir um nome' })
  @Length(4, 50, { message: 'O nome deve ter entre 4 e 50 caracteres' })
  name: string;

  @IsString({ message: 'Você deve inserir um sobrenome' })
  @Length(4, 50, { message: 'O sobrenome deve ter entre 4 e 50 caracteres' })
  surname: string;

  @IsOptional()
  @IsDateString()
  birthday: Date | null;
}
