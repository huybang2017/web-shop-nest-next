import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserAddress } from './user-address.entity';
import { UserPaymentMethod } from './user-payment-method.entity';
import { ShoppingCart } from './shopping-cart.entity';
import { ShopOrder } from './shop-order.entity';

export enum RoleType {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('site_user')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  password: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  phone_number: string;

  @OneToMany(() => UserAddress, (address) => address.user)
  addresses: UserAddress[];

  @OneToMany(() => UserPaymentMethod, (paymentMethod) => paymentMethod.user)
  paymentMethods: UserPaymentMethod[];

  @OneToMany(() => ShoppingCart, (cart) => cart.user)
  shoppingCarts: ShoppingCart[];

  @OneToMany(() => ShopOrder, (order) => order.user)
  orders: ShopOrder[];
}
