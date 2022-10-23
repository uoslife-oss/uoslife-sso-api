import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { v4 as uuid } from 'uuid';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception');

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const requestId = uuid();
    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof Error ? exception.message : 'INTERNAL_SERVER_ERROR';

    if (code >= 500) {
      this.logInternalError(ctx.getRequest(), requestId, message);
    }

    httpAdapter.reply(
      ctx.getResponse(),
      {
        requestId,
        code,
        message,
      },
      code,
    );
  }

  private logInternalError(
    request: any,
    requestId: string,
    message: string,
  ): void {
    const requestMethod = JSON.stringify(request.method);
    const requestBody = JSON.stringify(request.body);
    const requestURL = request.url;

    this.logger.error(
      `[${requestId}] ${message} ${requestMethod} ${requestURL} - ${requestBody}`,
    );
  }
}
