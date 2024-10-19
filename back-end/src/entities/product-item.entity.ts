import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';
import { ShoppingCartItem } from './shopping-cart-item.entity';
import { OrderLine } from './order-line.entity';

@Entity('product_item')
export class ProductItem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.productItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  SKU: string;

  @ApiProperty()
  @Column({ type: 'int' })
  qty_in_stock: number;

  @ApiProperty()
  @Column({ type: 'decimal' })
  price: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  product_image: string;

  @OneToMany(() => ShoppingCartItem, (cartItem) => cartItem.productItem)
  shoppingCartItems: ShoppingCartItem[];

  @OneToMany(() => OrderLine, (orderLine) => orderLine.productItem)
  orderLines: OrderLine[];
}
