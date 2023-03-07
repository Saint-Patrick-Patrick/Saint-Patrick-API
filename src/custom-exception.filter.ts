import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message = 'Ha ocurrido un error en el servidor';

    if (error instanceof HttpException) {
      status = error.getStatus();
      message = error.getResponse()['message'] || error.getResponse()['error'];
    } else {
      console.error(error);
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
