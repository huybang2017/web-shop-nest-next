import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from 'src/entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { CreateShoppingCartDto } from './dto/create-cart';
import { UpdateShoppingCartDto } from './dto/update-cart';
import { ShoppingCartItem } from 'src/entities/shopping-cart-item.entity';
import { User } from 'src/entities/site-user.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private shoppingCartRepository: Repository<ShoppingCart>,
    @InjectRepository(ShoppingCartItem)
    private shoppingCartItemRepository: Repository<ShoppingCartItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<ShoppingCart[]> {
    return await this.shoppingCartRepository.find({
      relations: ['user', 'cartItems', 'cartItems.productItem'],
    });
  }

  async findOne(id: number): Promise<ShoppingCart> {
    const cart = await this.shoppingCartRepository.findOne({
      where: { id },
      relations: ['user', 'cartItems', 'cartItems.productItem'],
    });
    if (!cart) {
      throw new NotFoundException(`Shopping Cart with ID ${id} not found`);
    }
    return cart;
  }

  async create(
    createShoppingCartDto: CreateShoppingCartDto,
  ): Promise<ShoppingCart> {
    const { userId, cartItems } = createShoppingCartDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const shoppingCart = this.shoppingCartRepository.create({ user });
    const savedCart = await this.shoppingCartRepository.save(shoppingCart);

    // Thêm các mục giỏ hàng
    const items = cartItems.map((item) =>
      this.shoppingCartItemRepository.create({
        cart: savedCart,
        productItem: { id: item.productItemId },
        qty: item.qty,
      }),
    );

    await this.shoppingCartItemRepository.save(items);

    return this.shoppingCartRepository.findOne({
      where: { id: savedCart.id },
      relations: ['cartItems', 'cartItems.productItem', 'user'],
    });
  }

  async update(
    updateShoppingCartDto: UpdateShoppingCartDto,
    cartId: number,
  ): Promise<ShoppingCart> {
    const { userId, cartItems } = updateShoppingCartDto;

    // Tìm giỏ hàng theo id
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: { id: cartId },
      relations: ['cartItems', 'user'],
    });

    if (!shoppingCart) {
      throw new Error('Shopping cart not found');
    }

    // Kiểm tra xem người dùng có tồn tại không
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Cập nhật thông tin người dùng của giỏ hàng
    shoppingCart.user = user;
    const updatedCart = await this.shoppingCartRepository.save(shoppingCart);

    // Cập nhật các mục trong giỏ hàng
    const updatedItems = cartItems.map((item) => {
      const cartItem = this.shoppingCartItemRepository.create({
        cart: updatedCart,
        productItem: { id: item.productItemId },
        qty: item.qty,
      });
      return cartItem;
    });

    await this.shoppingCartItemRepository.save(updatedItems);

    return this.shoppingCartRepository.findOne({
      where: { id: updatedCart.id },
      relations: ['cartItems', 'cartItems.productItem', 'user'],
    });
  }

  async remove(cartId: number): Promise<void> {
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: { id: cartId },
      relations: ['cartItems'],
    });

    if (!shoppingCart) {
      throw new Error('Shopping cart not found');
    }

    await this.shoppingCartItemRepository.delete({ cart: shoppingCart });

    await this.shoppingCartRepository.delete(cartId);
  }
}
