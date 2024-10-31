import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Promotion } from 'src/entities/promotion.entity';
import { ProductCategory } from 'src/entities/product-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Promotion, ProductCategory])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
