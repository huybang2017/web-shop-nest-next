import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const errorResponse = {
      message: [],
      error: 'Not Found',
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
