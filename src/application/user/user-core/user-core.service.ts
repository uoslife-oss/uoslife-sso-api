import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

import {
  CreateUserCommand,
  UpdateUserCommand,
} from '@application/user/user-core/user-core.command';
import { User, UserRepository } from '@domain/user';
import { UserNotFoundError } from '@infrastructure/user/user.errors';

@Injectable()
export class UserCoreService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async getProfile(userId: string): Promise<User> {
    try {
      return await this.userRepository.getUserById(userId);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException('USER_NOT_FOUND');
      }
      throw new InternalServerErrorException();
    }
  }

  async register(data: CreateUserCommand): Promise<User> {
    await Promise.all([
      this.isUsernameDuplicated(data.username),
      this.isEmailDuplicated(data.email),
      this.isNicknameDuplicated(data.nickname),
      this.isPhoneNumberDuplicated(data.phoneNumber),
    ]);

    if (data.email.split('@')[1] !== 'uos.ac.kr') {
      throw new BadRequestException('NOT_A_UOS_MAIL');
    }

    const user = new User({
      ...data,
      password: await this.hashPassword(data.password),
    });

    const id = await this.userRepository.register(user);
    return this.userRepository.getUserById(id);
  }

  async updateProfile(userId: string, data: UpdateUserCommand): Promise<User> {
    try {
      const user = await this.userRepository.getUserById(userId);

      await this.isNicknameDuplicated(data.nickname);

      const isUpdated = await this.userRepository.updateProfile(
        new User({ ...user, ...data }),
      );
      if (!isUpdated) return user;

      return this.userRepository.getUserById(user.id);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException('USER_NOT_FOUND');
      }
      throw new InternalServerErrorException();
    }
  }

  async withdraw(userId: string): Promise<boolean> {
    try {
      const user = await this.userRepository.getUserById(userId);
      return this.userRepository.withdraw(user.id);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException('USER_NOT_FOUND');
      }
      throw new InternalServerErrorException();
    }
  }

  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      secret: Buffer.from(this.configService.get<string>('APP_SECRET', '')),
    });
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, password, {
      secret: Buffer.from(this.configService.get<string>('APP_SECRET', '')),
    });
  }

  private async isUsernameDuplicated(username: string): Promise<void> {
    const duplicated = await this.userRepository.checkDuplicated(
      'username',
      username,
    );
    if (duplicated) throw new ConflictException('USERNAME_IN_USE');
  }

  private async isEmailDuplicated(email: string): Promise<void> {
    const duplicated = await this.userRepository.checkDuplicated(
      'email',
      email,
    );
    if (duplicated) throw new ConflictException('EMAIL_IN_USE');
  }

  private async isNicknameDuplicated(nickname: string): Promise<void> {
    const duplicated = await this.userRepository.checkDuplicated(
      'nickname',
      nickname,
    );
    if (duplicated) throw new ConflictException('NICKNAME_IN_USE');
  }

  private async isPhoneNumberDuplicated(phoneNumber: string): Promise<void> {
    const duplicated = await this.userRepository.checkDuplicated(
      'phoneNumber',
      phoneNumber,
    );
    if (duplicated) throw new ConflictException('PHONE_NUMBER_IN_USE');
  }
}
