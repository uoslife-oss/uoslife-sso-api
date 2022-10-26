import { AdminModule as AdminJSModule } from '@adminjs/nestjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AdminJS from 'adminjs';

import { AuthModule } from '@application/auth/auth.module';
import { AdminAuthService } from '@application/auth/authentication/services/admin-auth.service';
import { DatabaseUserModule } from '@infrastructure/user/database-user.module';
import { DatabaseUserRepository } from '@infrastructure/user/database-user.repository';
import { resources } from '@presentation/admin/resources';

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

@Module({
  imports: [
    AdminJSModule.createAdminAsync({
      imports: [DatabaseUserModule, AuthModule],
      inject: [AdminAuthService, ConfigService, DatabaseUserRepository],
      useFactory: async (
        authService: AdminAuthService,
        configService: ConfigService,
      ) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources,
          branding: {
            companyName: '시대생 SSO Console',
            withMadeWithLove: false,
            logo: false,
          },
        },
        auth: {
          authenticate: async (username, password) => {
            try {
              return await authService.login(username, password);
            } catch (error) {
              return null;
            }
          },
          cookieName: 'adminjs',
          cookiePassword: configService.get<string>('APP_SECRET'),
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: false,
          secret: configService.get<string>('APP_SECRET'),
        },
      }),
    }),
  ],
})
export class AdminModule {}
