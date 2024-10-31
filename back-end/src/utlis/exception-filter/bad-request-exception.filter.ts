import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const errorResponse = {
      message: [],
      error: 'Bad Request',
      statusCode: status,
    };

    const responseBody = exception.getResponse();
    // Kiểm tra xem phản hồi có phải là đối tượng không
    if (typeof responseBody === 'object' && responseBody) {
      // Nếu có thông báo lỗi, thêm vào mảng message
      if (Array.isArray(responseBody['message'])) {
        errorResponse.message = responseBody['message'];
      } else if (typeof responseBody['message'] === 'string') {
        errorResponse.message.push(responseBody['message']);
      }
    }

    response.status(status).json(errorResponse);
  }
}
