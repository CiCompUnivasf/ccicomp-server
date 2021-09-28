import { Status } from '@ccicomp/common';
import { VersionedEntity } from '@ccicomp/core/database';
import { Password } from '../aggregates';
import { IPerson } from '@/models/person/interfaces';

export interface IUser extends VersionedEntity {
  readonly id: number;

  email: string;

  login: string;

  password: Password;

  person: IPerson | Partial<IPerson>;

  status: Status;

  readonly version: number;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly deletedAt: Date;
}
