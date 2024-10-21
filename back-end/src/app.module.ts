import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/config.database';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ConflictExceptionFilter } from './utlis/exception-filter/conflict-exception.filter';
import { UnauthorizedExceptionFilter } from './utlis/exception-filter/unauthorized-exception.filter';
import { ForbiddenExceptionFilter } from './utlis/exception-filter/forbidden-exception.filter';
import { NotFoundExceptionFilter } from './utlis/exception-filter/not-found-exception.filter';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { ProductModule } from './modules/product.module';
import { TransformDataPipe } from './utlis/pipes/transfrom-data.pipe';
import { LoggerMiddleware } from './utlis/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    AuthModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ConflictExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ForbiddenExceptionFilter,
    },
    { provide: APP_FILTER, useClass: NotFoundExceptionFilter },
    {
      provide: APP_PIPE,
      useClass: TransformDataPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Áp dụng cho tất cả các route
  }
}
