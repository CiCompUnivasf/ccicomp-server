import { IsDefined, IsEmail, IsString, IsUrl, Length } from 'class-validator';
import { IArticle } from '../interfaces';

export class CreateArticleDto implements IArticle {
  @IsDefined()
  @Length(6, 30, { message: 'O seu nome deve conter entre 6 e 30 caracteres' })
  @IsString({ message: 'Digite um nome válido' })
  studentName: string;

  @IsDefined()
  @IsEmail({}, { message: 'Digite um e-mail válido' })
  mail: string;

  @IsDefined()
  @IsString()
  @IsUrl()
  uploadedFile: string;
}
