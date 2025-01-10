import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  CreateResourceDto,
  UpdateResourceDto,
} from '@/modules/access-control/application/dto/resource.dto';
import { RESOURCE_SERVICE } from '@/modules/access-control/access-control.tokens';
import { IResourceService } from '@/modules/access-control/domain/interfaces/resource-service.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ResourceEntity } from '@/modules/access-control/domain/entities/resource.entity';
import { PermissionsGuard } from '@/modules/access-control/presentation/guards/permissions.guard';
import { RequirePermissions } from '@/modules/access-control/presentation/decorators/permissions.decorator';

@ApiTags('Resources')
@Controller('resources')
@Injectable()
export class ResourcesController {
  constructor(
    @Inject(RESOURCE_SERVICE)
    private readonly resourceService: IResourceService,
  ) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('readAll:resource')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all resources' })
  @ApiResponse({
    status: 200,
    description: 'Returns all resources',
    type: ResourceEntity,
  })
  @Get()
  findAllResources() {
    return this.resourceService.findAll();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('create:resource')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a resource' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created resource',
    type: ResourceEntity,
  })
  @Post()
  createResource(@Body() createResourceDto: CreateResourceDto) {
    return this.resourceService.create(createResourceDto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('update:resource')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a resource' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated resource',
    type: ResourceEntity,
  })
  @Put(':id')
  updateResource(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourceService.update(id, updateResourceDto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('delete:resource')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a resource' })
  @ApiResponse({
    status: 200,
    description: 'Returns the deleted resource',
    type: ResourceEntity,
  })
  @Delete(':id')
  deleteResource(@Param('id') id: string) {
    return this.resourceService.delete(id);
  }
}
