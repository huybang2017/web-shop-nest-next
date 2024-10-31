import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ConflictException,
} from '@nestjs/common';

@Catch(ConflictException)
export class ConflictExceptionFilter implements ExceptionFilter {
  catch(exception: ConflictException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const errorResponse = {
      message: [],
      error: 'Conflict',
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

    // Gửi phản hồi với cấu trúc đã chỉnh sửa
    response.status(status).json(errorResponse);
  }
}
