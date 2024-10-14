import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Suppliers } from './entity/suppliers.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Suppliers)
    private suppliersRepository: Repository<Suppliers>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Suppliers> {
    const newSupplier = this.suppliersRepository.create(createSupplierDto);
    return this.suppliersRepository.save(newSupplier);
  }

  async findAll(): Promise<Suppliers[]> {
    return this.suppliersRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Suppliers> {
    const supplier = await this.suppliersRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  async update(
    id: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<Suppliers> {
    const supplier = await this.suppliersRepository.preload({
      id: id,
      ...updateSupplierDto,
    });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    return this.suppliersRepository.save(supplier);
  }

  async remove(id: number): Promise<void> {
    const result = await this.suppliersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
  }
}
