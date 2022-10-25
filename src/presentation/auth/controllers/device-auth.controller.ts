import { Controller, Delete, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DeviceAuthService } from '@application/auth/authentication/services/device-auth.service';

@Controller('auth/device')
@ApiTags('[인증] 기기 인증')
export class DeviceAuthController {
  constructor(private readonly deviceAuthService: DeviceAuthService) {}

  @Post('login')
  @ApiOperation({ summary: '기기 정보로 로그인합니다.' })
  async loginWithDevice() {}

  @Delete('logout')
  @ApiOperation({ summary: '기기를 삭제합니다.' })
  async logoutDevice() {}
}
