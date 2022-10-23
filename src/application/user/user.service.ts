import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

import {
  CreateUserCommand,
  UpdateUserCommand,
} from '@application/user/user.command';
import { User, UserRepository } from '@domain/user';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async register(data: CreateUserCommand): Promise<User> {
    const user = new User({
      ...data,
      password: await this.hashPassword(data.password),
    });

    const id = await this.userRepository.register(user);
    return this.userRepository.getUserById(id);
  }

  async updateProfile(userId: string, data: UpdateUserCommand): Promise<User> {
    const user = await this.userRepository.getUserById(userId);

    const isUpdated = await this.userRepository.updateProfile(
      new User({ ...user, ...data }),
    );

    if (!isUpdated) return user;
    return this.userRepository.getUserById(user.id);
  }

  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      secret: Buffer.from(this.configService.get<string>('APP_SECRET', '')),
    });
  }

  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, password, {
      secret: Buffer.from(this.configService.get<string>('APP_SECRET', '')),
    });
  }
}
