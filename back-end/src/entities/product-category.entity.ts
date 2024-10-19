import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';

@Entity('product_category')
export class ProductCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  category_name: string;

  @ManyToOne(() => ProductCategory, (parentCategory) => parentCategory.id)
  @JoinColumn({ name: 'parent_category_id' })
  parent_category_id: ProductCategory;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
