import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '@ccicomp/common';
import { Password } from './aggregates/password';

@Index('users_email_uindex', ['email'], { unique: true })
@Index('users_id_uindex', ['id'], { unique: true })
@Index('users_pk', ['id'], { unique: true })
@Index('users_login_uindex', ['login'], { unique: true })
@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'status', default: () => `${Status.PENDING}` })
  status: Status;

  @Column('varchar', { length: 50 })
  login: string;

  @Column('varchar', { length: 70, transformer: Password.transformer() })
  password: Password;

  @Column('varchar', { length: 255 })
  email: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;
}
