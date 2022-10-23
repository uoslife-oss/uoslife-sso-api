import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  UserVerification,
  VerificationState,
  VerificationType,
} from '@domain/user';
import { UserEntity } from '@infrastructure/user/user.entity';

@Entity('user_verifications')
export class UserVerificationEntity extends UserVerification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: true })
  code: string | null;

  @Column({ enum: VerificationType, default: VerificationType.EMAIL })
  type: VerificationType;

  @Column({ enum: VerificationState, default: VerificationState.PENDING })
  state: VerificationState;

  @Column({ type: Date, nullable: true })
  verifiedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, ({ verifications }) => verifications)
  user: UserEntity;
}
