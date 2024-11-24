import { ApiProperty } from '@nestjs/swagger';

export class CreateShoppingCartDto {
  @ApiProperty({
    type: Number,
    description: 'ID of the user',
  })
  userId: number;

  @ApiProperty({
    type: Array,
    description: 'Array of cart items with product ID and quantity',
    example: [
      { productItemId: 1, qty: 2 },
      { productItemId: 2, qty: 1 },
    ],
  })
  cartItems: { productItemId: number; qty: number }[];
}
