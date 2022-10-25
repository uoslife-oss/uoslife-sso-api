import { UserDevice, User } from '@domain/user';

type UserInfo = { user: User };

export type CreateUserDeviceCommand = UserInfo &
  Pick<UserDevice, 'type' | 'buildNumber' | 'model' | 'pushToken'>;

export type CreateUserDeviceResult = {
  originalSecret: string;
  secret: string;
};
