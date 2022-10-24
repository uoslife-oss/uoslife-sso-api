import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import {
  RequestWithDocumentCommand,
  RequestWithPortalCommand,
} from '@application/user/user-verification/user-verification.command';
import { VerificationType } from '@domain/user';

export class PortalUserVerificationRequest implements RequestWithPortalCommand {
  type: VerificationType.PORTAL;

  @ApiProperty({ description: '포털 아이디' })
  @IsString()
  @IsNotEmpty()
  portalUsername: string;

  @ApiProperty({ description: '포털 비밀번호' })
  @IsString()
  @IsNotEmpty()
  portalPassword: string;
}

export class DocumentUserVerificationRequest
  implements RequestWithDocumentCommand
{
  type: VerificationType.DOCUMENT;

  @ApiProperty({ description: '문서 이미지 주소' })
  @IsString()
  @IsNotEmpty()
  attachmentUrl: string;
}
