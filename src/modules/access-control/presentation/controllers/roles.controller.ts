import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateRoleDto } from '@/modules/access-control/application/dto/create-role.dto';
import { ROLES_SERVICE } from '../../roles-permissions.tokens';
import { IRolesService } from '../../domain/interfaces/role-service.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    @Inject(ROLES_SERVICE) private readonly roleService: IRolesService,
  ) {}

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'Returns all roles',
    type: RoleEntity,
  })
  @Get()
  findAllRoles() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: 'Create a role' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created role',
    type: RoleEntity,
  })
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
}
