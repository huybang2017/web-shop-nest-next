import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ShopOrder } from './shop-order.entity';
import { ProductItem } from './product-item.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserReview } from './user-review.entity';

@Entity('order_line')
export class OrderLine {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShopOrder, (shopOrder) => shopOrder.orderLines, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: ShopOrder;

  @ManyToOne(() => ProductItem, (productItem) => productItem.orderLines, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_item_id' })
  productItem: ProductItem;

  @ApiProperty()
  @Column({ type: 'int' })
  quantity: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => UserReview, (review) => review.orderProduct)
  reviews: UserReview[];
}
