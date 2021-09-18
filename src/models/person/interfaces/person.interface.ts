import { VersionedEntity } from '@ccicomp/core/database';
import { IUser } from '@/models/user';

export interface IPerson extends VersionedEntity {
  name: string;

  surname: string;

  birthday: Date | null;

  users: IUser[];

  fullname: string;
}
