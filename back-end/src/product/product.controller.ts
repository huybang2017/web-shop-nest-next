import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Return all products',
    type: [Product],
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Return a product', type: Product })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created', type: Product })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated', type: Product })
  @ApiParam({ name: 'id', type: 'number' })
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiParam({ name: 'id', type: 'number' })
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
