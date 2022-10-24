import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserAcademicRecordProps } from '@domain/user/models/user-academic-record';
import { UserEntity } from '@infrastructure/user/entities/user.entity';

@Entity('user_academic_records')
export class UserAcademicRecordEntity implements UserAcademicRecordProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  studentNumber: string;

  @Column()
  major: string;

  @Column()
  majorCode: string;

  @Column()
  department: string;

  @Column()
  departmentCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, ({ academicRecords }) => academicRecords)
  user: UserEntity;
}
