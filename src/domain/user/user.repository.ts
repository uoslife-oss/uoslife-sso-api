import { User } from '@domain/user/user';

export type UniqueKeys = 'username' | 'email' | 'nickname' | 'phoneNumber';

export interface UserRepository {
  register(user: User): string | Promise<string>;
  getUserById(id: string): User | Promise<User>;
  getUserByUsername(username: string): User | Promise<User>;
  updateProfile(user: User): boolean | Promise<boolean>;
  withdraw(id: string): boolean | Promise<boolean>;
  checkDuplicated(key: UniqueKeys, value: string): boolean | Promise<boolean>;
}
