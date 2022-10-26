import { NestApplication } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { tags } from './swagger.tags';

const document = new DocumentBuilder()
  .setTitle(`시대생 SSO API`)
  .setDescription(`시대생 SSO 서비스 API 문서입니다.`)
  .setContact('시대생 개발팀', 'https://uoslife.team', 'support@uoslife.team')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
  .addServer(process.env.APP_URL || 'http://localhost:3000')
  .addServer('https://sso-api.uoslife.team/')
  .setExternalDoc('시대생 SSO Console', '/admin')
  .setVersion('1.0.0');

tags.forEach((tag) => document.addTag(tag.name, tag.description));

export default function generateSwaggerDocument(
  app: NestApplication | NestExpressApplication,
) {
  return SwaggerModule.createDocument(app, document.build());
}
