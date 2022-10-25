import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AccountAuthService } from '@application/auth/authentication/services/account-auth.service';
import { DeviceAuthService } from '@application/auth/authentication/services/device-auth.service';
import { UserModule } from '@application/user/user.module';
import { DatabaseUserModule } from '@infrastructure/user/database-user.module';
import { DatabaseUserRepository } from '@infrastructure/user/database-user.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('APP_SECRET'),
        verifyOptions: {
          issuer: configService.get<string>('APP_URL'),
          ignoreNotBefore: false,
          ignoreExpiration: false,
        },
        signOptions: {
          issuer: configService.get<string>('APP_URL'),
          notBefore: '0s',
        },
      }),
    }),
    UserModule,
    DatabaseUserModule,
  ],
  providers: [
    AccountAuthService,
    DeviceAuthService,
    {
      provide: 'UserRepository',
      useExisting: DatabaseUserRepository,
    },
  ],
  exports: [AccountAuthService, DeviceAuthService],
})
export class AuthenticationModule {}
