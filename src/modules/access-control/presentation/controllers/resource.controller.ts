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
} from '@nestjs/common';
import {
  CreateResourceDto,
  UpdateResourceDto,
} from '@/modules/access-control/application/dto/resource.dto';
import { RESOURCE_SERVICE } from '@/modules/access-control/access-control.tokens';
import { IResourceService } from '@/modules/access-control/domain/interfaces/resource-service.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResourceEntity } from '@/modules/access-control/domain/entities/resource.entity';

@ApiTags('Resources')
@Controller('resources')
@Injectable()
export class ResourcesController {
  constructor(
    @Inject(RESOURCE_SERVICE)
    private readonly resourceService: IResourceService,
  ) {}

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
