import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionCategory } from 'src/entities/promotion-category.entity';
import { Promotion } from 'src/entities/promotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion, PromotionCategory])],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
