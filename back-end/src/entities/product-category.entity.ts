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
import { Variation } from './variation.entity';
import { PromotionCategory } from './promotion-category.entity';

@Entity('product_category')
export class ProductCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  category_name: string;

  @ApiProperty({ required: false }) // Indicating that this field is optional
  @ManyToOne(
    () => ProductCategory,
    (parentCategory) => parentCategory.children,
    { nullable: true },
  )
  @JoinColumn({ name: 'parent_category_id' })
  parent_category_id?: ProductCategory; // Make this property optional

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => Variation, (variation) => variation.category)
  variations: Variation[];

  @OneToMany(
    () => PromotionCategory,
    (promotionCategory) => promotionCategory.productCategory,
  )
  promotionCategories: PromotionCategory[];

  // This is to establish the reverse relation for children categories
  @OneToMany(() => ProductCategory, (category) => category.parent_category_id)
  children: ProductCategory[];
}
