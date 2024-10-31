import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from 'src/entities/product-category.entity';
import { Promotion } from 'src/entities/promotion.entity';
import { FilterDto, PaginationDto, SortDto } from './dto/product-params.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly categoryRepository: Repository<ProductCategory>,
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  async findAll(
    filter?: FilterDto,
    sort?: SortDto,
    pagination?: PaginationDto,
  ): Promise<Product[]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.productItems', 'productItems');

    if (filter) {
      if (filter.category_id) {
        queryBuilder.andWhere('category.id = :category_id', {
          categoryId: filter.category_id,
        });
      }
      if (filter.name) {
        queryBuilder.andWhere('product.name LIKE :name', {
          name: `%${filter.name}%`,
        });
      }
    }

    if (sort.field && sort.order) {
      queryBuilder.orderBy(`product.${sort.field}`, sort.order);
    }

    if (pagination.page && pagination.limit) {
      queryBuilder
        .skip((pagination.page - 1) * pagination.limit)
        .take(pagination.limit);
    }
    return await queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'productItems'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    const updatedProduct = Object.assign(product, updateProductDto);
    return this.productRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);
  }

  async findProductsPromotion(): Promise<Product[]> {
    const products = await this.productRepository.find({
      relations: ['category', 'productItems'],
    });

    const productsWithPromotions = await Promise.all(
      products.map(async (product) => {
        if (product.category) {
          const categoryId = product.category.id;
          const category = await this.categoryRepository.findOne({
            where: { id: categoryId }, // Sử dụng id của category đầu tiên
            relations: ['promotionCategories'],
          });

          if (category && category.promotionCategories.length > 0) {
            const promotion = await this.promotionRepository.findOne({
              where: { id: category.promotionCategories[0].promotion_id },
            });

            return {
              ...product,
              promotion,
            };
          }
        }
      }),
    );

    return productsWithPromotions;
  }
}
