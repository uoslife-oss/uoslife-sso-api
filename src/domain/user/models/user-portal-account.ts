export type UserPortalAccountProps = {
  id: string;
  username: string;
  password: string;
  lastUsedAt: Date;
};

export class UserPortalAccount implements UserPortalAccountProps {
  id!: string;
  username!: string;
  password!: string;
  lastUsedAt!: Date;

  constructor(data: Partial<UserPortalAccountProps>) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.lastUsedAt = data.lastUsedAt || new Date();
  }
}
