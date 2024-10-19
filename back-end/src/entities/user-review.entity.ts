import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './site-user.entity';
import { OrderLine } from './order-line.entity';

@Entity('user_review')
export class UserReview {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'int' })
  rating: number;

  @ApiProperty()
  @Column({ type: 'text' })
  comment: string;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @ManyToOne(() => OrderLine, (orderline) => orderline.reviews)
  @JoinColumn({ name: 'order_product_id' })
  orderProduct: OrderLine;
}
