import { User } from '@domain/user/models/user';
import { UserAcademicRecord } from '@domain/user/models/user-academic-record';
import { UserPortalAccount } from '@domain/user/models/user-portal-account';
import { UserVerification } from '@domain/user/models/user-verification';

export type UniqueKeys = 'username' | 'email' | 'nickname' | 'phoneNumber';

export interface UserRepository {
  /* User */
  register(user: User): string | Promise<string>;

  /* Get */
  getUserById(id: string): User | Promise<User>;
  getUserByUsername(username: string): User | Promise<User>;
  getUserByVerificationId(id: string): User | Promise<User>;
  getUserByVerificationCode(code: string): User | Promise<User>;

  updateProfile(user: User): boolean | Promise<boolean>;
  withdraw(id: string): boolean | Promise<boolean>;
  checkDuplicated(key: UniqueKeys, value: string): boolean | Promise<boolean>;

  /* Verification */
  createVerification(
    user: User,
    verification: UserVerification,
  ): string | Promise<string>;
  updateVerification(
    user: User,
    verification: UserVerification,
  ): boolean | Promise<boolean>;

  /* Portal Account */
  createPortalAccount(
    user: User,
    account: UserPortalAccount,
  ): string | Promise<string>;
  deletePortalAccount(
    user: User,
    account: UserPortalAccount,
  ): boolean | Promise<boolean>;

  /* Academic Record */
  upsertAcademicRecord(
    user: User,
    record: UserAcademicRecord,
  ): string | Promise<string>;
}
