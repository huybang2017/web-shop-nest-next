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

    response.status(status).json({
      statusCode: status,
      message: 'Access forbidden',
      errors: exception.getResponse(), // Lấy thông tin chi tiết về lỗi
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
