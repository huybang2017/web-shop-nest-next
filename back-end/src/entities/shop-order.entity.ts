import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Address } from './address.entity';
import { OrderLine } from './order-line.entity';
import { OrderStatus } from './order-status.entity';
import { ShippingMethod } from './shipping-method.entity';
import { UserPaymentMethod } from './user-payment-method.entity';
import { User } from './site-user.entity';

@Entity('shop_order')
export class ShopOrder {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Address, (address) => address.orders)
  @JoinColumn({ name: 'shipping_address_id' })
  shippingAddress: Address;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.order)
  orderLines: OrderLine[];

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  order_total: number;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  order_date: Date;

  @ManyToOne(() => OrderStatus, (status) => status.orders)
  @JoinColumn({ name: 'order_status_id' })
  status: OrderStatus;

  @ManyToOne(() => ShippingMethod, (shippingMethod) => shippingMethod.orders)
  @JoinColumn({ name: 'shipping_method_id' })
  shippingMethod: ShippingMethod;

  @ManyToOne(() => UserPaymentMethod, (user) => user.orders)
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: UserPaymentMethod;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
