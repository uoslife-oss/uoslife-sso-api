import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthenticatedRequest } from '../../../utils/types/request.type';

import { JwtAuthGuard } from '@application/auth/authentication/guards/auth.guard';
import { UserVerificationService } from '@application/user/user-verification/services/user-verification.service';
import { VerificationType } from '@domain/user';
import { PortalUserVerificationRequest } from '@presentation/user/dtos/user-verification.request';

@Controller('verifications')
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
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '포털 연동을 요청합니다.' })
  @ApiBearerAuth()
  async createPortalRequest(
    @Req() { user }: AuthenticatedRequest,
    @Body() data: PortalUserVerificationRequest,
  ) {
    const verificationId = await this.portalVerificationService.request(
      user.id,
      data,
    );

    await this.portalVerificationService.process(verificationId);
    return this.portalVerificationService.finish(verificationId);
  }

  @Post(`${VerificationType.EMAIL}/:code`)
  @ApiOperation({ summary: '이메일 인증을 완료합니다.' })
  async callbackEmailVerification(@Param('code') code: string) {
    const verificationId = await this.emailVerificationService.callback({
      code,
    });

    return this.emailVerificationService.finish(verificationId);
  }
}
