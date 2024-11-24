import { PartialType } from '@nestjs/swagger';
import { CreateShoppingCartDto } from './create-cart';

export class UpdateShoppingCartDto extends PartialType(CreateShoppingCartDto) {}
