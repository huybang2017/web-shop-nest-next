import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entity/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Suppliers } from 'src/suppliers/entity/suppliers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Suppliers])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
