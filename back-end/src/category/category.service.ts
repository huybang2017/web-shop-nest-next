import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/entities/product-category.entity';
import { Repository } from 'typeorm';
import { UpdateProductCategoryDto } from './dto/update-category.dto';
import { CreateProductCategoryDto } from './dto/create-catefory.dto';
import { FilterDto, PaginationDto, SortDto } from './dto/category-params.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly categoryRepository: Repository<ProductCategory>,
  ) {}

  async findAll(
    filterDto: FilterDto,
    sortDto: SortDto,
    paginationDto: PaginationDto,
  ): Promise<ProductCategory[]> {
    const { category_name, parent_category_id } = filterDto;
    const { sortField, sortOrder } = sortDto;
    const { page, limit } = paginationDto;

    const query = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.parent_category_id', 'parent_category_id')
      .leftJoinAndSelect('category.promotionCategories', 'promotionCategories');

    if (category_name) {
      query.andWhere('category.category_name = :category_name', {
        category_name,
      });
    }

    if (parent_category_id) {
      query.andWhere('category.parent_category_id = :parent_category_id', {
        parent_category_id,
      });
    }

    if (sortField && sortOrder) {
      query.orderBy(`category.${sortField}`, sortOrder);
    }
    if (page && limit) {
      query.skip((page - 1) * limit).take(limit);
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<ProductCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent_category_id', 'promotionCategories'],
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
