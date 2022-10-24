import {
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserVerificationService } from '@application/user/user-verification/services/user-verification.service';
import { VerificationType } from '@domain/user';
import { PortalUserVerificationRequest } from '@presentation/user/dtos/user-verification.request';

@Controller('users/:userId/verifications')
@ApiTags('[사용자] 계정 인증')
export class UserVerificationController {
  constructor(
    @Inject('EmailVerificationService')
    private readonly emailVerificationService: UserVerificationService,
    @Inject('PortalVerificationService')
    private readonly portalVerificationService: UserVerificationService,
    @Inject('DocumentVerificationService')
    private readonly documentVerificationService: UserVerificationService,
  ) {}

  @Post(VerificationType.PORTAL)
  @ApiOperation({ summary: '포털 연동을 요청합니다.' })
  async createPortalRequest(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() data: PortalUserVerificationRequest,
  ) {
    const verificationId = await this.portalVerificationService.request(
      userId,
      data,
    );

    await this.portalVerificationService.process(verificationId);
    return this.portalVerificationService.finish(verificationId);
  }
}
