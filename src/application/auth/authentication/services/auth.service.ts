import { JwtService } from '@nestjs/jwt';

import { TokenType } from '@application/auth/authentication/authentication.command';

export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  protected async generateAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { aud: userId, sub: TokenType.ACCESS },
      { expiresIn: '1h' },
    );
  }

  protected async generateRefreshToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { aud: userId, sub: TokenType.REFRESH },
      { expiresIn: '2w' },
    );
  }
}
