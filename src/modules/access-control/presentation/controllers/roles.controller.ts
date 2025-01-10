import {
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Put,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import {
  CreateRoleDto,
  UpdateRoleDto,
} from '@/modules/access-control/application/dto/create-role.dto';
import { ROLE_SERVICE } from '@/modules/access-control/access-control.tokens';
import { IRolesService } from '@/modules/access-control/domain/interfaces/role-service.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@/modules/access-control/presentation/guards/permissions.guard';
import { RequirePermissions } from '@/modules/access-control/presentation/decorators/permissions.decorator';

@ApiTags('Roles')
@Controller('roles')
@Injectable()
export class RolesController {
  constructor(
    @Inject(ROLE_SERVICE) private readonly roleService: IRolesService,
  ) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('readAll:role')
  @ApiBearerAuth()
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

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('create:role')
  @ApiBearerAuth()
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

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('update:role')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated role',
    type: RoleEntity,
  })
  @Put(':id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('delete:role')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({
    status: 200,
    description: 'Returns the deleted role',
  })
  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
