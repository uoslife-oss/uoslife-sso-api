import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { generate } from 'randomstring';

import {
  CreateUserDeviceCommand,
  CreateUserDeviceResult,
} from '@application/user/user-device/user-device.command';
import { UserRepository, User } from '@domain/user';
import { UserDevice } from '@domain/user/models/user-device';

@Injectable()
export class UserDeviceService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async registerDevice(data: CreateUserDeviceCommand): Promise<UserDevice> {
    const { user, ...profile } = data;
    const { secret, originalSecret } = await this.generateDeviceSecret();

    const device = new UserDevice({ ...profile, secret });
    const id = await this.userRepository.createDevice(user, device);

    return new UserDevice({ ...device, id, secret: originalSecret });
  }

  getDeviceProfile(user: User, deviceId: string): UserDevice {
    const device = user.devices.find((device) => device.id === deviceId);
    if (!device) throw new NotFoundException('DEVICE_NOT_FOUND');
    return device;
  }

  async updateDeviceProfile(
    user: User,
    deviceId: string,
    data: any,
  ): Promise<UserDevice> {
    const originalDevice = this.getDeviceProfile(user, deviceId);
    const updatedDevice = new UserDevice({ ...originalDevice, ...data });

    const isUpdated = await this.userRepository.updateDevice(
      user,
      updatedDevice,
    );

    if (!isUpdated) return originalDevice;
    return updatedDevice;
  }

  async deleteDevice(user: User, deviceId: string): Promise<boolean> {
    const device = this.getDeviceProfile(user, deviceId);
    return this.userRepository.deleteDevice(user, device);
  }

  private async generateDeviceSecret(): Promise<CreateUserDeviceResult> {
    const originalSecret = generate({
      length: 10,
      charset: 'alphanumeric',
      capitalization: 'uppercase',
    });

    const secret = await argon2.hash(originalSecret, {
      secret: Buffer.from(this.configService.get<string>('APP_SECRET')),
    });

    return { originalSecret, secret };
  }
}
