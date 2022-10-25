import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenType } from '@application/auth/authentication/authentication.command';
import { UserRepository } from '@domain/user';
import { UserNotFoundError } from '@infrastructure/user/user.errors';

export type JwtPayload = {
  aud: string;
  sub: TokenType;
  iat: number;
  nbf: number;
  exp: number;
  iss: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      issuer: configService.get<string>('APP_URL'),
      secretOrKey: configService.get<string>('APP_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.sub !== TokenType.ACCESS) {
      throw new UnauthorizedException('INVALID_TOKEN');
    }

    try {
      return await this.userRepository.getUserById(payload.aud);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new UnauthorizedException('INVALID_TOKEN');
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
