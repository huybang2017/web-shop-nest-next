import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suppliers } from './entity/suppliers.entity';
import { Products } from 'src/products/entity/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suppliers, Products])],
  providers: [SuppliersService],
  controllers: [SuppliersController],
  exports: [SuppliersService],
})
export class SuppliersModule {}
