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
import { TransformDataPipe } from './utlis/pipes/transfrom-data.pipe';
import { LoggerMiddleware } from './utlis/middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { PromotionModule } from './promotion/promotion.module';
import { CategoryModule } from './category/category.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    AuthModule,
    UserModule,
    ProductModule,
    PromotionModule,
    CategoryModule,
    ShoppingCartModule,
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
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
