import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { VariationOption } from './variation-option.entity';
import { ProductCategory } from './product-category.entity';

@Entity('variation')
export class Variation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(
    () => VariationOption,
    (variationOption) => variationOption.variation,
  )
  variationOptions: VariationOption[];

  @ManyToOne(() => ProductCategory, (productCategory) => productCategory.id)
  @JoinColumn({ name: 'category_id' })
  category: ProductCategory;
}
