import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/entities/product-category.entity';
import { Repository } from 'typeorm';
import { UpdateProductCategoryDto } from './dto/update-category.dto'; // Fix the import path
import { CreateProductCategoryDto } from './dto/create-catefory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly categoryRepository: Repository<ProductCategory>,
  ) {}

  async findAll(): Promise<ProductCategory[]> {
    const categories = await this.categoryRepository.find({
      relations: ['parent_category_id'],
    });
    console.log(categories);
    return categories;
  }

  async findOne(id: number): Promise<ProductCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent_category_id'],
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    const category = this.categoryRepository.create({
      category_name: createProductCategoryDto.category_name,
      parent_category_id: createProductCategoryDto.parent_category_id
        ? { id: createProductCategoryDto.parent_category_id }
        : null,
    });

    return this.categoryRepository.save(category);
  }

  async update(
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    const updatedCategory = Object.assign(updateProductCategoryDto);
    return this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
