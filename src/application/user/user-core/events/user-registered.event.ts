import { User } from '@domain/user';

export type UserRegisteredEventProps = {
  user: User;
};

export class UserRegisteredEvent {
  user!: User;

  constructor(data: UserRegisteredEventProps) {
    this.user = data.user;
  }
}
