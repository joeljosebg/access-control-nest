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
  CreatePermissionDto,
  UpdatePermissionDto,
} from '@/modules/access-control/application/dto/create-permission.dto';
import { PERMISSION_SERVICE } from '@/modules/access-control/access-control.tokens';
import { IPermissionService } from '@/modules/access-control/domain/interfaces/permission-service.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@/modules/access-control/presentation/guards/permissions.guard';
import { RequirePermissions } from '@/modules/access-control/presentation/decorators/permissions.decorator';

@ApiTags('Permissions')
@Controller('permissions')
@Injectable()
export class PermissionsController {
  constructor(
    @Inject(PERMISSION_SERVICE)
    private readonly permissionService: IPermissionService,
  ) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('readAll:permission')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({
    status: 200,
    description: 'Returns all permissions',
    type: PermissionEntity,
  })
  @Get()
  findAllPermissions() {
    return this.permissionService.findAll();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('create:permission')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a permission' })
  @ApiResponse({
    status: 200,
    description: 'Returns the created permission',
    type: PermissionEntity,
  })
  @Post()
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('update:permission')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a permission' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated permission',
    type: PermissionEntity,
  })
  @Put(':id')
  updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('delete:permission')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a permission' })
  @ApiResponse({
    status: 200,
    description: 'Returns the deleted permission',
  })
  @Delete(':id')
  deletePermission(@Param('id') id: string) {
    return this.permissionService.delete(id);
  }
}
