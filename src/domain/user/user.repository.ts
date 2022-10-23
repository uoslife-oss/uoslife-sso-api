import { User } from '@domain/user/user';

export interface UserRepository {
  register(user: User): string | Promise<string>;
  getUserById(id: string): User | Promise<User>;
  getUserByUsername(username: string): User | Promise<User>;
  updateUser(user: User): boolean | Promise<boolean>;
  withdraw(id: string): boolean | Promise<boolean>;
}
