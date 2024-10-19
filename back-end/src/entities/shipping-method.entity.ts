import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShopOrder } from './shop-order.entity';

@Entity('shipping_method')
export class ShippingMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  price: number;

  @OneToMany(() => ShopOrder, (order) => order.shippingMethod)
  orders: ShopOrder[];
}
