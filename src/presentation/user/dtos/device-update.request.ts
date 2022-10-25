import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DeviceUpdateRequest {
  @ApiPropertyOptional({ nullable: true, description: '앱 빌드 번호' })
  @IsOptional()
  @IsNumber()
  buildNumber: number | null;

  @ApiPropertyOptional({ nullable: true, description: '푸시 토큰' })
  @IsOptional()
  @IsString()
  pushToken: string | null;
}
