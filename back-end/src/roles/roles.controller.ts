import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entity/role.entity';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('apis/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Role created successfully',
    type: Role,
  })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieve all roles', type: [Role] })
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Retrieve a role by ID',
    type: Role,
  })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async findOne(@Param('id') id: number): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Role updated successfully',
    type: Role,
  })
  async update(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Role deleted successfully' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.rolesService.remove(id);
  }
}
