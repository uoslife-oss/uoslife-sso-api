import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthenticatedRequest } from '../../../utils/types/request.type';

import { JwtAuthGuard } from '@application/auth/authentication/guards/auth.guard';
import { AccountAuthService } from '@application/auth/authentication/services/account-auth.service';
import { AccountLoginRequest } from '@presentation/auth/dtos/account-login.request';
import { AccountProfileResponse } from '@presentation/auth/dtos/account-profile.response';
import { LoginResponse } from '@presentation/auth/dtos/login.response';
import { RefreshRequest } from '@presentation/auth/dtos/refresh.request';
import { RefreshResponse } from '@presentation/auth/dtos/refresh.response';

@Controller('auth')
@ApiTags('[인증] 계정 인증')
export class AccountAuthController {
  constructor(private readonly accountAuthService: AccountAuthService) {}

  @Post('login')
  @ApiOperation({ summary: '계정으로 로그인합니다.' })
  @ApiOkResponse({ type: LoginResponse })
  async getToken(@Body() data: AccountLoginRequest): Promise<LoginResponse> {
    const result = await this.accountAuthService.generateToken(data);
    return new LoginResponse(result);
  }

  @Patch('refresh')
  @ApiOperation({ summary: '인증 토큰을 갱신합니다.' })
  @ApiOkResponse({ type: RefreshResponse })
  async refreshToken(@Body() data: RefreshRequest): Promise<RefreshResponse> {
    const result = await this.accountAuthService.refreshToken(data);
    return new RefreshResponse(result);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '로그인된 프로필 정보를 조회합니다.' })
  @ApiOkResponse({ type: AccountProfileResponse })
  @ApiBearerAuth()
  async getProfile(
    @Req() { user }: AuthenticatedRequest,
  ): Promise<AccountProfileResponse> {
    return new AccountProfileResponse(user);
  }
}
