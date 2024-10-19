import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ShopOrder } from './shop-order.entity';

@Entity('order_status')
export class OrderStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  status: string;

  @OneToMany(() => ShopOrder, (order) => order.status)
  orders: ShopOrder[];
}
