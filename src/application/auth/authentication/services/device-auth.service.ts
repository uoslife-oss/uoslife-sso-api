import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  GenerateTokenResult,
  GenerateTokenWithDeviceCommand,
  TokenType,
} from '@application/auth/authentication/authentication.command';
import { UserCoreService } from '@application/user/user-core/user-core.service';
import { UserRepository } from '@domain/user';
import { UserNotFoundError } from '@infrastructure/user/user.errors';

@Injectable()
export class DeviceAuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly userService: UserCoreService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithDevice(
    data: GenerateTokenWithDeviceCommand,
  ): Promise<GenerateTokenResult> {
    try {
      const user = await this.userRepository.getUserByDeviceId(data.deviceId);
      const device = user.getDeviceById(data.deviceId);

      if (!device) throw new NotFoundException('DEVICE_NOT_FOUND');

      const isVerified = await this.userService.verifyPassword(
        data.deviceSecret,
        device.secret,
      );

      if (!isVerified) throw new NotFoundException('DEVICE_NOT_FOUND');

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
        throw new NotFoundException('DEVICE_NOT_FOUND');
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
