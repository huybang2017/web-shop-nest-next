import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserPaymentMethod } from './user-payment-method.entity';

@Entity('payment_type')
export class PaymentType {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'int' })
  value: number;

  @OneToMany(
    () => UserPaymentMethod,
    (paymentMethod) => paymentMethod.paymentType,
  )
  paymentMethods: UserPaymentMethod[];
}
