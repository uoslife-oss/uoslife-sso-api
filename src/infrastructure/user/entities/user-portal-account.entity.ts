import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EncryptionOptions, EncryptionTransformer } from 'typeorm-encrypted';

import { UserPortalAccountProps } from '@domain/user/user-portal-account';
import { UserEntity } from '@infrastructure/user/entities/user.entity';

const ENCRYPTION_CONFIG: EncryptionOptions = {
  algorithm: 'aria-256-cbc',
  key: process.env.APP_ENCRYPTION_KEY || '',
  ivLength: 16,
};

@Entity('user_portal_accounts')
export class UserPortalAccountEntity implements UserPortalAccountProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: String,
    transformer: new EncryptionTransformer(ENCRYPTION_CONFIG),
  })
  username: string;

  @Column({
    type: String,
    transformer: new EncryptionTransformer(ENCRYPTION_CONFIG),
  })
  password: string;

  @Column()
  lastUsedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, ({ portalAccounts }) => portalAccounts)
  user: UserEntity;
}
