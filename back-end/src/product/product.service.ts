import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Get all products
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['category'],
    });
  }

  // Get a single product by ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  // Create a new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  // Update a product by ID
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    const updatedProduct = Object.assign(product, updateProductDto);
    return this.productRepository.save(updatedProduct);
  }

  // Delete a product by ID
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);
  }
}
