import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductItem } from './product-item.entity';
import { VariationOption } from './variation-option.entity';

@Entity('product_configuration')
export class ProductConfiguration {
  @PrimaryColumn() // Define as a primary key
  product_item_id: number;

  @PrimaryColumn() // Define as a primary key
  variation_option_id: number;

  @ManyToOne(() => ProductItem, (productItem) => productItem.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_item_id' })
  productItem: ProductItem;

  @ManyToOne(() => VariationOption, (variationOption) => variationOption.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'variation_option_id' })
  variationOption: VariationOption;
}
