import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Variation } from './variation.entity';

@Entity('variation_option')
export class VariationOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  value: string;

  @ManyToOne(() => Variation, (variation) => variation.variationOptions, {
    onDelete: 'CASCADE',
  })
  variation: Variation;
}
