import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  GenerateTokenCommand,
  GenerateTokenResponse,
  TokenType,
} from '@application/auth/authentication/authentication.command';
import { UserCoreService } from '@application/user/user-core/user-core.service';
import { UserRepository } from '@domain/user';
import { UserNotFoundError } from '@infrastructure/user/user.errors';

@Injectable()
export class AccountAuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly userService: UserCoreService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(
    data: GenerateTokenCommand,
  ): Promise<GenerateTokenResponse> {
    try {
      const user = await this.userRepository.getUserByUsername(data.username);

      const isVerified = await this.userService.verifyPassword(
        data.password,
        user.password,
      );

      if (!isVerified) {
        throw new NotFoundException('USER_NOT_FOUND');
      }

      return {
        accessToken: await this.generateAccessToken(user.id),
        refreshToken: await this.generateRefreshToken(user.id),
        userId: user.id,
      };
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof NotFoundException
      ) {
        throw new NotFoundException('USER_NOT_FOUND');
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  private async generateAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { aud: userId, sub: TokenType.ACCESS },
      { expiresIn: '1h' },
    );
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { aud: userId, sub: TokenType.REFRESH },
      { expiresIn: '2w' },
    );
  }
}
