import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { Promotion } from 'src/entities/promotion.entity';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const promotion = this.promotionRepository.create(createPromotionDto);
    return this.promotionRepository.save(promotion);
  }

  async findAll(): Promise<Promotion[]> {
    return this.promotionRepository.find({
      relations: ['promotionCategories'],
    });
  }

  async findOne(id: number): Promise<Promotion> {
    return this.promotionRepository.findOne({
      where: { id },
      relations: ['promotionCategories'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.promotionRepository.delete(id);
  }
}
