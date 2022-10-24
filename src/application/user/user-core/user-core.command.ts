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
>;

export type UpdateUserCommand = Partial<
  Pick<User, 'nickname' | 'profileImage'>
>;