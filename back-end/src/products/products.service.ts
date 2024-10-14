import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './entity/products.entity';
import { Suppliers } from 'src/suppliers/entity/suppliers.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,

    @InjectRepository(Suppliers)
    private suppliersRepository: Repository<Suppliers>,
  ) {}

  @UseGuards()
  @ApiBearerAuth()
  async create(createProductDto: CreateProductDto): Promise<Products> {
    const supplier = await this.suppliersRepository.findOne({
      where: { id: createProductDto.supplier_id },
    });

    if (!supplier) {
      throw new NotFoundException(
        `Supplier with ID ${createProductDto.supplier_id} not found`,
      );
    }

    const product = this.productsRepository.create({
      ...createProductDto,
      supplier,
    });

    return await this.productsRepository.save(product);
  }

  async findAll(): Promise<Products[]> {
    return this.productsRepository.find({ relations: ['supplier'] });
  }

  async findOne(id: number): Promise<Products> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['supplier'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  @UseGuards()
  @ApiBearerAuth()
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    const product = await this.findOne(id);

    if (updateProductDto.supplier_id) {
      const supplier = await this.suppliersRepository.findOne({
        where: { id: updateProductDto.supplier_id },
      });
      if (!supplier) {
        throw new NotFoundException(
          `Supplier with ID ${updateProductDto.supplier_id} not found`,
        );
      }
      product.supplier = supplier;
    }

    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  @UseGuards()
  @ApiBearerAuth()
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }
}
