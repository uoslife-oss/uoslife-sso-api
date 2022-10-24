import { User } from '@domain/user/user';
import { UserAcademicRecord } from '@domain/user/user-academic-record';
import { UserPortalAccount } from '@domain/user/user-portal-account';
import { UserVerification } from '@domain/user/user-verification';

export type UniqueKeys = 'username' | 'email' | 'nickname' | 'phoneNumber';

export interface UserRepository {
  /* User */
  register(user: User): string | Promise<string>;

  /* Get */
  getUserById(id: string): User | Promise<User>;
  getUserByUsername(username: string): User | Promise<User>;
  getUserByVerificationId(verificationId: string): User | Promise<User>;

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
  createAcademicRecord(
    user: User,
    record: UserAcademicRecord,
  ): string | Promise<string>;
}
