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
import { UserVerificationEntity } from '@infrastructure/user/user-verification.entity';

@Entity('users')
export class UserEntity implements UserProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
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
}
