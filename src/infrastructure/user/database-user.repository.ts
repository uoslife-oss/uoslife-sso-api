import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  UniqueKeys,
  User,
  UserRepository,
  UserVerification,
} from '@domain/user';
import { UserAcademicRecord } from '@domain/user/user-academic-record';
import { UserPortalAccount } from '@domain/user/user-portal-account';
import { UserAcademicRecordEntity } from '@infrastructure/user/entities/user-academic-record.entity';
import { UserPortalAccountEntity } from '@infrastructure/user/entities/user-portal-account.entity';
import { UserVerificationEntity } from '@infrastructure/user/entities/user-verification.entity';
import { UserEntity } from '@infrastructure/user/entities/user.entity';
import { UserNotFoundError } from '@infrastructure/user/user.errors';

export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserVerificationEntity)
    private readonly verificationRepository: Repository<UserVerificationEntity>,
    @InjectRepository(UserPortalAccountEntity)
    private readonly portalAccountRepository: Repository<UserPortalAccountEntity>,
    @InjectRepository(UserAcademicRecordEntity)
    private readonly academicRecordRepository: Repository<UserAcademicRecordEntity>,
  ) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .andWhere('user.deletedAt IS NULL')
      .leftJoinAndSelect('user.verifications', 'verifications')
      .leftJoinAndSelect('user.portalAccounts', 'portalAccounts')
      .leftJoinAndSelect('user.academicRecords', 'academicRecords')
      .orderBy('portalAccounts.createdAt', 'DESC')
      .getOne();

    if (!user) throw new UserNotFoundError();

    return new User(user);
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .andWhere('deletedAt IS NULL')
      .leftJoinAndSelect('user.verifications', 'verifications')
      .leftJoinAndSelect('user.portalAccounts', 'portalAccounts')
      .leftJoinAndSelect('user.academicRecords', 'academicRecords')
      .getOne();

    if (!user) throw new UserNotFoundError();

    return new User(user);
  }

  async getUserByVerificationId(id: string): Promise<User> {
    const verification = await this.verificationRepository
      .createQueryBuilder('verification')
      .where('verification.id = :id', { id })
      .leftJoinAndSelect('verification.user', 'user')
      .getOne();

    return this.getUserById(verification.user.id);
  }

  async getUserByVerificationCode(code: string): Promise<User> {
    const verification = await this.verificationRepository
      .createQueryBuilder('verification')
      .where('verification.code = :code', { code })
      .leftJoinAndSelect('verification.user', 'user')
      .getOne();

    return this.getUserById(verification.user.id);
  }

  async register(user: User): Promise<string> {
    const { identifiers } = await this.userRepository
      .createQueryBuilder('user')
      .insert()
      .values(user)
      .execute();

    return identifiers[0].id;
  }

  async updateProfile(user: User): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { verifications, academicRecords, portalAccounts, ...profile } = user;

    const { affected } = await this.userRepository
      .createQueryBuilder('user')
      .update()
      .where('id = :id', { id: user.id })
      .andWhere('deletedAt IS NULL')
      .set(profile)
      .execute();

    return affected > 0;
  }

  async withdraw(id: string): Promise<boolean> {
    const { affected } = await this.userRepository
      .createQueryBuilder('user')
      .softDelete()
      .where('id = :id', { id })
      .andWhere('deletedAt IS NULL')
      .execute();

    return affected > 0;
  }

  async checkDuplicated(key: UniqueKeys, value: string): Promise<boolean> {
    const count = await this.userRepository
      .createQueryBuilder('user')
      .where(`user.${key} = :value`, { value })
      .andWhere('user.deletedAt IS NULL')
      .getCount();

    return count > 0;
  }

  async createVerification(
    user: User,
    verification: UserVerification,
  ): Promise<string> {
    const { identifiers } = await this.verificationRepository
      .createQueryBuilder('verification')
      .insert()
      .values({
        ...verification,
        user: { id: user.id },
      })
      .execute();

    return identifiers[0].id;
  }

  async updateVerification(
    user: User,
    verification: UserVerification,
  ): Promise<boolean> {
    const { affected } = await this.verificationRepository
      .createQueryBuilder('verification')
      .update()
      .where('id = :id', { id: verification.id })
      .set(verification)
      .execute();

    return affected > 0;
  }

  async createPortalAccount(
    user: User,
    account: UserPortalAccount,
  ): Promise<string> {
    const { identifiers } = await this.portalAccountRepository
      .createQueryBuilder('account')
      .insert()
      .values({
        ...account,
        user: { id: user.id },
      })
      .execute();

    return identifiers[0].id;
  }

  async deletePortalAccount(
    user: User,
    account: UserPortalAccount,
  ): Promise<boolean> {
    const { affected } = await this.portalAccountRepository
      .createQueryBuilder('account')
      .delete()
      .where('id = :id', { id: account.id })
      .execute();

    return affected > 0;
  }

  async createAcademicRecord(
    user: User,
    record: UserAcademicRecord,
  ): Promise<string> {
    const { identifiers } = await this.academicRecordRepository
      .createQueryBuilder('account')
      .insert()
      .values({
        ...record,
        user: { id: user.id },
      })
      .execute();

    return identifiers[0].id;
  }
}
