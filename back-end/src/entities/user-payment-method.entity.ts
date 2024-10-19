import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from './payment-type.entity';
import { User } from './site-user.entity';
import { ShopOrder } from './shop-order.entity';

@Entity('user_payment_method')
export class UserPaymentMethod {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.paymentMethods)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @ManyToOne(() => PaymentType, (paymentType) => paymentType.paymentMethods)
  @JoinColumn({ name: 'payment_type_id' })
  paymentType: PaymentType;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  provider: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  account_number: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  expiry_date: Date;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @OneToMany(() => ShopOrder, (order) => order.paymentMethod)
  orders: ShopOrder[];
}
