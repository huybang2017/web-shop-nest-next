import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ShoppingCart } from './shopping-cart.entity';
import { ProductItem } from './product-item.entity';

@Entity('shopping_cart_item')
export class ShoppingCartItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShoppingCart, (cart) => cart.cartItems)
  @JoinColumn({ name: 'cart_id' })
  cart: ShoppingCart;

  @ManyToOne(() => ProductItem, (productItem) => productItem.shoppingCartItems)
  @JoinColumn({ name: 'product_item_id' })
  productItem: ProductItem;

  @ApiProperty()
  @Column({ type: 'int' })
  qty: number;
}
