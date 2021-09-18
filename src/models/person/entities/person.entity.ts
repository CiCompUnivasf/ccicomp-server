import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Status } from '@ccicomp/common';
import { IPerson } from '../interfaces';
import { User } from '@/models/user';

@Index('persons_id_uindex', ['id'], { unique: true })
@Index('persons_pk', ['id'], { unique: true })
@Entity('persons')
export class Person implements IPerson {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'status', default: () => `${Status.ACTIVE}` })
  status: Status;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'surname', length: 50 })
  surname: string;

  @Column('date', { name: 'birthday', nullable: true })
  birthday: Date | null;

  @OneToMany(() => User, (users) => users.person)
  users: User[];

  @VersionColumn()
  readonly version: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;

  @Expose()
  get fullname(): string {
    return [this.name, this.surname].join(' ');
  }
}
