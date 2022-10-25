export enum DeviceType {
  IOS = 'ios',
  ANDROID = 'android',
  WEB = 'web',
}

export type UserDeviceProps = {
  id: string;
  secret: string;
  type: DeviceType;
  model: string | null;
  pushToken: string | null;
  buildNumber: number | null;
};

export class UserDevice implements UserDeviceProps {
  id!: string;
  secret!: string;
  type!: DeviceType;
  model!: string | null;
  pushToken!: string | null;
  buildNumber!: number | null;

  constructor(data: Partial<UserDeviceProps>) {
    this.id = data.id;
    this.secret = data.secret;
    this.type = data.type;
    this.model = data.model || null;
    this.pushToken = data.pushToken || null;
    this.buildNumber = data.buildNumber || null;
  }
}
