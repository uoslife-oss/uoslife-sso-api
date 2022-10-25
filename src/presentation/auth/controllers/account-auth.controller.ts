import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AccountAuthService } from '@application/auth/authentication/services/account-auth.service';
import { AccountLoginRequest } from '@presentation/auth/dtos/account-login.request';
import { AccountLoginResponse } from '@presentation/auth/dtos/account-login.response';
import { AccountProfileResponse } from '@presentation/auth/dtos/account-profile.response';
import { AccountRefreshRequest } from '@presentation/auth/dtos/account-refresh.request';
import { AccountRefreshResponse } from '@presentation/auth/dtos/account-refresh.response';

@Controller('auth')
@ApiTags('[인증] 계정 인증')
export class AccountAuthController {
  constructor(private readonly accountAuthService: AccountAuthService) {}

  @Post('login')
  @ApiOperation({ summary: '계정으로 로그인합니다.' })
  @ApiOkResponse({ type: AccountLoginResponse })
  async getToken(
    @Body() data: AccountLoginRequest,
  ): Promise<AccountLoginResponse> {
    const result = await this.accountAuthService.generateToken(data);
    return new AccountLoginResponse(result);
  }

  @Patch('refresh')
  @ApiOperation({ summary: '인증 토큰을 갱신합니다.' })
  @ApiOkResponse({ type: AccountRefreshResponse })
  async refreshToken(@Body() data: AccountRefreshRequest) {}

  @Get('profile')
  @ApiOperation({ summary: '로그인된 프로필 정보를 조회합니다.' })
  @ApiOkResponse({ type: AccountProfileResponse })
  async getProfile() {}
}
