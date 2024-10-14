import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Images } from './entity/images.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Images')
@Controller('apis/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The image has been successfully created.',
    type: Images,
  })
  async create(@Body() createImageDto: CreateImageDto): Promise<Images> {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return all images.',
    type: [Images],
  })
  async findAll(): Promise<Images[]> {
    return this.imagesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Return a single image by ID.',
    type: Images,
  })
  @ApiResponse({ status: 404, description: 'Image not found.' })
  async findOne(@Param('id') id: number): Promise<Images> {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update the image.', type: Images })
  @ApiResponse({ status: 404, description: 'Image not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateImageDto: UpdateImageDto,
  ): Promise<Images> {
    return this.imagesService.update(id, updateImageDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Image successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Image not found.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.imagesService.remove(id);
  }
}
