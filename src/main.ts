import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';

import { MainModule } from './main.module';
import generateSwaggerDocument from './presentation/swagger/swagger.generator';

import { CustomExceptionFilter } from '@presentation/filters/exception.filter';

(async () => {
  // Initialize app with root module
  const app = await NestFactory.create<NestExpressApplication>(MainModule);

  // Create swagger document
  SwaggerModule.setup('docs', app, generateSwaggerDocument(app), {
    customSiteTitle: '시대생 SSO API',
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

  if (process.env.NODE_ENV === 'production') {
    app.useGlobalFilters(new CustomExceptionFilter(app.get(HttpAdapterHost)));
  }

  // Apply CORS
  app.enableCors({ origin: true, credentials: true });

  // Listen to requests
  await app.listen(process.env.APP_PORT || 3000, '0.0.0.0');
})();
