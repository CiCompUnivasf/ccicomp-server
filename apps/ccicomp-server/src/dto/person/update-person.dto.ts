import { Allow } from 'class-validator';
import { CreatePersonDto } from './create-person.dto';

export class UpdatePersonDto extends CreatePersonDto {
  @Allow()
  id: number;
}
