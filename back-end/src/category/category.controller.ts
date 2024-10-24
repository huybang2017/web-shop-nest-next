import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateProductCategoryDto } from './dto/create-catefory.dto';
import { UpdateProductCategoryDto } from './dto/update-category.dto';
import { ProductCategory } from 'src/entities/product-category.entity';

@ApiTags('Category')
@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all product categories' })
  @ApiResponse({
    status: 200,
    description: 'List of product categories',
    type: [ProductCategory],
  })
  async findAll(): Promise<ProductCategory[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product category found',
    type: ProductCategory,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async findOne(@Param('id') id: number): Promise<ProductCategory> {
    return this.categoryService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product category' })
  @ApiResponse({
    status: 201,
    description: 'Product category created',
    type: ProductCategory,
  })
  async create(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.categoryService.create(createProductCategoryDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product category updated',
    type: ProductCategory,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async update(
    @Param('id') id: number,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    // Set the ID from the URL param into the update DTO
    updateProductCategoryDto.id = id;
    return this.categoryService.update(updateProductCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product category by ID' })
  @ApiResponse({ status: 204, description: 'Product category deleted' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
