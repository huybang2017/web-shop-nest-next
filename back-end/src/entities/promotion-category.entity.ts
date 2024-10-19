import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductCategory } from './product-category.entity';
import { Promotion } from './promotion.entity';

@Entity('promotion_category')
export class PromotionCategory {
  @PrimaryColumn() // Define this as a primary key column
  category_id: number;

  @PrimaryColumn() // Define this as a primary key column
  promotion_id: number;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.promotionCategories,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'category_id' })
  productCategory: ProductCategory;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotionCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;
}
