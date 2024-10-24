import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { Promotion } from 'src/entities/promotion.entity';

@ApiTags('Promotion')
@Controller('api/promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @ApiOperation({ summary: 'Create a new promotion' })
  @ApiResponse({ status: 201, description: 'The promotion has been created.' })
  @Post()
  async create(
    @Body() createPromotionDto: CreatePromotionDto,
  ): Promise<Promotion> {
    return this.promotionService.create(createPromotionDto);
  }

  @ApiOperation({ summary: 'Get all promotions' })
  @ApiResponse({ status: 200, description: 'Return all promotions.' })
  @Get()
  async findAll(): Promise<Promotion[]> {
    return this.promotionService.findAll();
  }

  @ApiOperation({ summary: 'Get a promotion by id' })
  @ApiResponse({ status: 200, description: 'Return promotion with given id.' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Promotion> {
    return this.promotionService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete a promotion by id' })
  @ApiResponse({ status: 200, description: 'The promotion has been deleted.' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.promotionService.remove(id);
  }
}
