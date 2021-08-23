import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export interface IHttpException {
  statusCode: number;
  message: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<unknown> {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = statusCode >= 500 ? 'Server Error' : 'Kernel Panic!';

    if (exception instanceof HttpException) message = exception?.message;

    res.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
