import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';

import { MainModule } from './main.module';
import generateSwaggerDocument from './utils/swagger/swagger.generator';

(async () => {
  // Initialize app with root module
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
  );

  // Create swagger document
  SwaggerModule.setup('docs', app, generateSwaggerDocument(app), {
    customSiteTitle: '시대생 ID API',
    swaggerOptions: { persistAuthorization: true },
  });

  // Apply rules for validation
  app
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

  // Apply CORS
  app.enableCors({ origin: true, credentials: true });

  // Listen to requests
  await app.listen(process.env.APP_PORT || 3000, '0.0.0.0');
})();
