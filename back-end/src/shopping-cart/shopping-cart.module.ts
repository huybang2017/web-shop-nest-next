import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from 'src/entities/shopping-cart.entity';
import { ShoppingCartItem } from 'src/entities/shopping-cart-item.entity';
import { User } from 'src/entities/site-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, ShoppingCartItem, User])],
  providers: [ShoppingCartService],
  controllers: [ShoppingCartController],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}
