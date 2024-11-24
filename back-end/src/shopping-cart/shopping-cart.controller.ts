import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from 'src/entities/shopping-cart.entity';
import { CreateShoppingCartDto } from './dto/create-cart';
import { UpdateShoppingCartDto } from './dto/update-cart';

@ApiTags('Shopping Cart')
@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Get()
  @ApiOperation({ summary: 'Get all shopping carts' })
  async findAll(): Promise<ShoppingCart[]> {
    return this.shoppingCartService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shopping cart by ID' })
  async findOne(@Param('id') id: number): Promise<ShoppingCart> {
    return this.shoppingCartService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new shopping cart' })
  async create(
    @Body() createShoppingCartDto: CreateShoppingCartDto,
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.create(createShoppingCartDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a shopping cart by ID' })
  async update(
    @Param('id') id: number,
    @Body() updateShoppingCartDto: UpdateShoppingCartDto,
  ): Promise<ShoppingCart> {
    return this.shoppingCartService.update(updateShoppingCartDto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shopping cart by ID' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.shoppingCartService.remove(id);
  }
}
