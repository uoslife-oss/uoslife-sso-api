import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DeviceType, UserDeviceProps } from '@domain/user/models/user-device';
import { UserEntity } from '@infrastructure/user/entities/user.entity';

@Entity('user_devices')
export class UserDeviceEntity extends BaseEntity implements UserDeviceProps {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  secret: string;

  @Column({ enum: DeviceType, default: DeviceType.WEB })
  type: DeviceType;

  @Column({ nullable: true })
  buildNumber: number | null;

  @Column({ nullable: true })
  model: string | null;

  @Column({ nullable: true })
  pushToken: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, ({ devices }) => devices)
  user: UserEntity;

  @Column({ nullable: true })
  userId: string | null;
}
