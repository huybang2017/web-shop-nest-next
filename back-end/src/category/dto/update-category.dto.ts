import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductCategoryDto } from './create-catefory.dto';

export class UpdateProductCategoryDto extends PartialType(
  CreateProductCategoryDto,
) {
  @ApiProperty()
  id: number;
}
