import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PromotionCategory } from './promotion-category.entity';

@Entity('promotion')
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discount_rate: number;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  start_date: Date;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  end_date: Date;

  @OneToMany(
    () => PromotionCategory,
    (promotionCategory) => promotionCategory.promotion,
  )
  promotionCategories: PromotionCategory[];
}
