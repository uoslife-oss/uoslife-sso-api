import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserProps, UserState, UserType } from '@domain/user';
import { UserAcademicRecordEntity } from '@infrastructure/user/entities/user-academic-record.entity';
import { UserDeviceEntity } from '@infrastructure/user/entities/user-device.entity';
import { UserPortalAccountEntity } from '@infrastructure/user/entities/user-portal-account.entity';
import { UserVerificationEntity } from '@infrastructure/user/entities/user-verification.entity';

@Entity('users')
export class UserEntity implements UserProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  nickname: string | null;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ type: String, nullable: true })
  profileImage: string | null;

  @Column({ enum: UserState, default: UserState.UNVERIFIED })
  state: UserState;

  @Column({ enum: UserType, default: UserType.NORMAL })
  type: UserType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => UserVerificationEntity, ({ user }) => user)
  verifications: UserVerificationEntity[];

  @OneToMany(() => UserPortalAccountEntity, ({ user }) => user)
  portalAccounts: UserPortalAccountEntity[];

  @OneToMany(() => UserAcademicRecordEntity, ({ user }) => user)
  academicRecords: UserAcademicRecordEntity[];

  @OneToMany(() => UserDeviceEntity, ({ user }) => user)
  devices: UserDeviceEntity[];
}
