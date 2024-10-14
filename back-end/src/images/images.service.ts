import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Images } from './entity/images.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
  ) {}

  async create(createImageDto: CreateImageDto): Promise<Images> {
    const image = this.imagesRepository.create(createImageDto);
    return this.imagesRepository.save(image);
  }

  async findAll(): Promise<Images[]> {
    return this.imagesRepository.find();
  }

  async findOne(id: number): Promise<Images> {
    const image = await this.imagesRepository.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return image;
  }

  async update(id: number, updateImageDto: UpdateImageDto): Promise<Images> {
    await this.findOne(id); // Kiểm tra xem hình ảnh có tồn tại không
    await this.imagesRepository.update(id, updateImageDto);
    return this.findOne(id); // Trả về hình ảnh đã cập nhật
  }

  async remove(id: number): Promise<void> {
    const image = await this.findOne(id);
    await this.imagesRepository.remove(image);
  }
}
