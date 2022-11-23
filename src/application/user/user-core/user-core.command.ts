import { User } from '@domain/user';

export type CreateUserCommand = Pick<
  User,
  | 'username'
  | 'password'
  | 'email'
  | 'name'
  | 'nickname'
  | 'phoneNumber'
  | 'profileImage'
> &
  Partial<Pick<User, 'id'>>;

export type UpdateUserCommand = Partial<
  Pick<User, 'nickname' | 'profileImage'> & { newPassword?: string }
>;

export type MigrateUserCommand = {
  username: string;
  password: string;
  email: string;
};
