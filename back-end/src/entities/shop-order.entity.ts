import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from './address.entity';
import { User } from './site-user.entity';

@Entity('shop_order')
export class ShopOrder {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Address, (address) => address.orders)
  @JoinColumn({ name: 'shipping_address_id' })
  shippingAddress: Address;

  @ApiProperty()
  @Column({ type: 'decimal' })
  total_price: number;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  order_date: Date;
}
