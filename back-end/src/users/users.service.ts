import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/entity/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await this.roleRepository.findOne({ where: { id: 3 } });

    if (!role) {
      throw new NotFoundException(`Role with ID 3 not found`);
    }

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: role,
    });

    return this.userRepository.save(newUser);
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['role'] });
  }

  // Find user by id
  async findOneByid(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  // Update user by id
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneByid(id);

    if (updateUserDto.password) {
      // Hash the new password if it's being updated
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = Object.assign(user, updateUserDto);
    return this.userRepository.save(updatedUser);
  }

  // Delete user by id
  async remove(id: number): Promise<void> {
    const user = await this.findOneByid(id);
    await this.userRepository.remove(user);
  }
}
