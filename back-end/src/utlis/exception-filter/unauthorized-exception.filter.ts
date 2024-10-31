import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const errorResponse = {
      message: [],
      error: 'Unauthorized',
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
