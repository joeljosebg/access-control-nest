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
  CreateEntityDto,
  UpdateEntityDto,
} from '@/modules/access-control/application/dto/entity.dto';
import { ENTITY_SERVICE } from '@/modules/access-control/access-control.tokens';
import { IEntityService } from '@/modules/access-control/domain/interfaces/entity-service.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EntityEntity } from '@/modules/access-control/domain/entities/entity.entity';

@ApiTags('Entities')
@Controller('entities')
@Injectable()
export class EntitiesController {
  constructor(
    @Inject(ENTITY_SERVICE)
    private readonly entityService: IEntityService,
  ) {}

  @ApiOperation({ summary: 'Get all resources' })
  @ApiResponse({
    status: 200,
    description: 'Returns all entities',
    type: EntityEntity,
  })
  @Get()
  findAllEntities() {
    return this.entityService.findAll();
  }

  @ApiOperation({ summary: 'Create a entity' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created entity',
    type: EntityEntity,
  })
  @Post()
  createEntity(@Body() createEntityDto: CreateEntityDto) {
    return this.entityService.create(createEntityDto);
  }

  @ApiOperation({ summary: 'Update a resource' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated entity',
    type: EntityEntity,
  })
  @Put(':id')
  updateEntity(
    @Param('id') id: string,
    @Body() updateEntityDto: UpdateEntityDto,
  ) {
    return this.entityService.update(id, updateEntityDto);
  }

  @ApiOperation({ summary: 'Delete a entity' })
  @ApiResponse({
    status: 200,
    description: 'Returns the deleted entity',
    type: EntityEntity,
  })
  @Delete(':id')
  deleteEntity(@Param('id') id: string) {
    return this.entityService.delete(id);
  }
}
