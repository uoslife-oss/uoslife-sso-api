import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as argon2 from 'argon2';

import { UserRegisteredEvent } from '@application/user/user-core/events/user-registered.event';
import {
  CreateUserCommand,
  MigrateUserCommand,
  UpdateUserCommand,
} from '@application/user/user-core/user-core.command';
import { User, UserRepository } from '@domain/user';
import { OldAccountScrapper } from '@infrastructure/scrap/uoslife/old-account.scrapper';
import { BadUOSLIFECredentialsError } from '@infrastructure/scrap/uoslife/scrap-uoslife.errors';
import { UserNotFoundError } from '@infrastructure/user/user.errors';

@Injectable()
export class UserCoreService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly oldAccountScrapper: OldAccountScrapper,
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
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

    this.eventEmitter.emit(
      'user.registered',
      new UserRegisteredEvent({ user }),
    );

    return this.userRepository.getUserById(id);
  }

  async registerWithMigration(data: MigrateUserCommand): Promise<User> {
    try {
      const user = await this.oldAccountScrapper.scrap({
        username: data.username,
        password: data.password,
      });

      user.email = data.email;
      return this.register(user);
    } catch (error) {
      if (error instanceof BadUOSLIFECredentialsError) {
        throw new BadRequestException('BAD_UOSLIFE_CREDENTIALS');
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateProfile(userId: string, data: UpdateUserCommand): Promise<User> {
    try {
      const user = await this.userRepository.getUserById(userId);

      await this.isNicknameDuplicated(data.nickname);

      const updatedUser = new User({ ...user, ...data });

      if (data.newPassword) {
        updatedUser.password = await this.hashPassword(data.newPassword);
      }

      const isUpdated = await this.userRepository.updateProfile(updatedUser);
      if (!isUpdated) return user;

      return this.userRepository.getUserById(user.id);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException('USER_NOT_FOUND');
      }
      console.error(error);
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
