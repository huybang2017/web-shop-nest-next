import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ShoppingCartItem } from './shopping-cart-item.entity';
import { User } from './site-user.entity';

@Entity('shopping_cart')
export class ShoppingCart {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.shoppingCarts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ShoppingCartItem, (cartItem) => cartItem.cart)
  cartItems: ShoppingCartItem[];
}
