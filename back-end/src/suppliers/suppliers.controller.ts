import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Suppliers } from './entity/suppliers.entity';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Suppliers')
@Controller('apis/suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @ApiOperation({ summary: 'Create a new supplier' })
  @ApiResponse({
    status: 201,
    description: 'The supplier has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async create(
    @Body() createSupplierDto: CreateSupplierDto,
  ): Promise<Suppliers> {
    return this.suppliersService.create(createSupplierDto);
  }

  @ApiOperation({ summary: 'Get all suppliers' })
  @ApiResponse({
    status: 200,
    description: 'List of suppliers returned successfully.',
  })
  @ApiResponse({ status: 404, description: 'No suppliers found' })
  @Get()
  async findAll(): Promise<Suppliers[]> {
    return this.suppliersService.findAll();
  }

  @ApiOperation({ summary: 'Get a supplier by ID' })
  @ApiResponse({
    status: 200,
    description: 'Supplier found and returned successfully.',
  })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Suppliers> {
    const supplier = await this.suppliersService.findOne(id);
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  @ApiOperation({ summary: 'Update a supplier by ID' })
  @ApiResponse({
    status: 200,
    description: 'Supplier has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<Suppliers> {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  @ApiOperation({ summary: 'Delete a supplier by ID' })
  @ApiResponse({
    status: 204,
    description: 'Supplier has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.suppliersService.remove(id);
  }
}
