import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreatePermissionDto } from '@/modules/access-control/application/dto/create-permission.dto';
import { PERMISSIONS_SERVICE } from '../../roles-permissions.tokens';
import { IPermissionService } from '../../domain/interfaces/permission-service.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(
    @Inject(PERMISSIONS_SERVICE)
    private readonly permissionService: IPermissionService,
  ) {}

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

  @Post()
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }
}
