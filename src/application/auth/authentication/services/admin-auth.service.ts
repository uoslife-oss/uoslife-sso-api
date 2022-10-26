import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CurrentAdmin } from 'adminjs';

import { UserCoreService } from '@application/user/user-core/user-core.service';
import { UserRepository, UserType } from '@domain/user';
import { UserNotFoundError } from '@infrastructure/user/user.errors';

@Injectable()
export class AdminAuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly userService: UserCoreService,
  ) {}

  async login(username: string, password: string): Promise<CurrentAdmin> {
    try {
      const user = await this.userRepository.getUserByUsername(username);

      const isVerified = await this.userService.verifyPassword(
        password,
        user.password,
      );

      if (!isVerified) {
        throw new NotFoundException('USER_NOT_FOUND');
      }

      if (user.type !== UserType.ADMIN) {
        throw new ForbiddenException();
      }

      return { email: user.email, id: user.id, title: user.name };
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof NotFoundException
      ) {
        throw new NotFoundException('USER_NOT_FOUND');
      }
      if (error instanceof ForbiddenException) throw error;
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
