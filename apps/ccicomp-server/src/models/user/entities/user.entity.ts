import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Status } from '@ccicomp/common';
import { Person } from '../../person/entities';
import { Password } from '../aggregates';
import { IUser } from '../interfaces';

@Index('users_email_uindex', ['email'], { unique: true })
@Index('users_id_uindex', ['id'], { unique: true })
@Index('users_pk', ['id'], { unique: true })
@Index('users_login_uindex', ['login'], { unique: true })
@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'status', default: () => `${Status.PENDING}` })
  status: Status;

  @Column('varchar', { length: 50 })
  login: string;

  @Column('varchar', {
    length: 70,
    select: false,
    transformer: Password.transformer(),
  })
  @Exclude()
  password: Password;

  @Column('varchar', { length: 255 })
  email: string;

  @ManyToOne(() => Person, (persons) => persons.users, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn([{ name: 'person_id', referencedColumnName: 'id' }])
  person: Person;

  @VersionColumn()
  readonly version: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;
}
