import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ForbiddenException,
} from '@nestjs/common';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const errorResponse = {
      message: [],
      error: 'Forbidden',
      statusCode: status,
    };

    const responseBody = exception.getResponse();

    if (typeof responseBody === 'object' && responseBody) {
      if (Array.isArray(responseBody['message'])) {
        errorResponse.message = responseBody['message'];
      } else if (typeof responseBody['message'] === 'string') {
        errorResponse.message.push(responseBody['message']);
      }
    }

    response.status(status).json(errorResponse);
  }
}
