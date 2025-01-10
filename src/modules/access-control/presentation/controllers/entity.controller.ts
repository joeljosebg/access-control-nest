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
  CreateEntityDto,
  UpdateEntityDto,
} from '@/modules/access-control/application/dto/entity.dto';
import { ENTITY_SERVICE } from '@/modules/access-control/access-control.tokens';
import { IEntityService } from '@/modules/access-control/domain/interfaces/entity-service.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EntityEntity } from '@/modules/access-control/domain/entities/entity.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@/modules/access-control/presentation/guards/permissions.guard';
import { RequirePermissions } from '@/modules/access-control/presentation/decorators/permissions.decorator';

@ApiTags('Entities')
@Controller('entities')
@Injectable()
export class EntitiesController {
  constructor(
    @Inject(ENTITY_SERVICE)
    private readonly entityService: IEntityService,
  ) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('readAll:entity')
  @ApiBearerAuth()
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

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('create:entity')
  @ApiBearerAuth()
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

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('update:entity')
  @ApiBearerAuth()
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

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('delete:entity')
  @ApiBearerAuth()
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
