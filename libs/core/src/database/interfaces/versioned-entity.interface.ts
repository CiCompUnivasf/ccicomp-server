import { Status } from '@ccicomp/common';
import { BaseEntity } from './base-entity.interface';

export interface VersionedEntity extends BaseEntity {
  status: Status;

  // Vezes que a entidade foi modificada no banco de dados
  readonly version: number;

  readonly createdAt: Date;

  readonly updatedAt: Date | null;

  // Data em que a entidade foi removida (soft-remove)
  readonly deletedAt: Date | null;
}
