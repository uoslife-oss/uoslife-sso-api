import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeviceAuthService } from '@application/auth/authentication/services/device-auth.service';
import { DeviceLoginRequest } from '@presentation/auth/dtos/device-login.request';
import { LoginResponse } from '@presentation/auth/dtos/login.response';

@Controller('auth/device')
@ApiTags('[인증] 기기 인증')
export class DeviceAuthController {
  constructor(private readonly deviceAuthService: DeviceAuthService) {}

  @Post('login')
  @ApiOperation({ summary: '기기 정보로 로그인합니다.' })
  @ApiOkResponse({ type: LoginResponse })
  async loginWithDevice(
    @Body() data: DeviceLoginRequest,
  ): Promise<LoginResponse> {
    const result = await this.deviceAuthService.loginWithDevice(data);
    return new LoginResponse(result);
  }
}
