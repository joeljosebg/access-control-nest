import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';
import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';
import { RoleRepository } from '@/modules/access-control/infrastructure/repositories/role.repository';
import { PermissionRepository } from '@/modules/access-control/infrastructure/repositories/permission.repository';

import {
  ENDPOINT_REPOSITORY,
  ENDPOINT_SERVICE,
  ENTITY_REPOSITORY,
  ENTITY_SERVICE,
  FIELD_REPOSITORY,
  FIELD_SERVICE,
  PERMISSION_REPOSITORY,
  PERMISSION_SERVICE,
  RESOURCE_REPOSITORY,
  RESOURCE_SERVICE,
  ROLE_REPOSITORY,
  ROLE_SERVICE,
} from '@/modules/access-control/access-control.tokens';
import { RolesController } from '@/modules/access-control/presentation/controllers/roles.controller';
import { PermissionsController } from '@/modules/access-control/presentation/controllers/permission.controller';
import { ResourcesController } from '@/modules/access-control/presentation/controllers/resource.controller';
import { ResourceService } from '@/modules/access-control/application/services/resource.service';
import { PermissionService } from '@/modules/access-control/application/services/permission.service';

import { ResourceEntity } from '@/modules/access-control/domain/entities/resource.entity';
import { ResourceRepository } from '@/modules/access-control/infrastructure/repositories/resource.repository';
import { EndpointEntity } from '@/modules/access-control/domain/entities/endpoint.entity';
import { FieldEntity } from '@/modules/access-control/domain/entities/field.entity';
import { EntityEntity } from '@/modules/access-control/domain/entities/entity.entity';
import { EndpointRepository } from './infrastructure/repositories/endpoint.repository';
import { FieldRepository } from './infrastructure/repositories/field.repository';
import { EntityRepository } from './infrastructure/repositories/entity.repository';
import { RoleService } from './application/services/role-service';
import { EntityService } from './application/services/entity.service';
import { FieldService } from './application/services/field.service';
import { EndpointService } from './application/services/endpoint.service';
import { EntitiesController } from './presentation/controllers/entity.controller';
import { EndpointsController } from './presentation/controllers/endpoint.controller';
import { FieldsController } from './presentation/controllers/field.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity,
      PermissionEntity,
      ResourceEntity,
      EndpointEntity,
      EntityEntity,
      FieldEntity,
    ]),
  ],
  controllers: [
    RolesController,
    PermissionsController,
    ResourcesController,
    FieldsController,
    EntitiesController,
    EndpointsController,
  ],
  providers: [
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleRepository,
    },
    {
      provide: PERMISSION_REPOSITORY,
      useClass: PermissionRepository,
    },
    {
      provide: RESOURCE_REPOSITORY,
      useClass: ResourceRepository,
    },
    {
      provide: ENDPOINT_REPOSITORY,
      useClass: EndpointRepository,
    },
    {
      provide: ENTITY_REPOSITORY,
      useClass: EntityRepository,
    },
    {
      provide: FIELD_REPOSITORY,
      useClass: FieldRepository,
    },
    {
      provide: ROLE_SERVICE,
      useClass: RoleService,
    },
    {
      provide: PERMISSION_SERVICE,
      useClass: PermissionService,
    },
    {
      provide: RESOURCE_SERVICE,
      useClass: ResourceService,
    },
    {
      provide: ENDPOINT_SERVICE,
      useClass: EndpointService,
    },
    {
      provide: ENTITY_SERVICE,
      useClass: EntityService,
    },
    {
      provide: FIELD_SERVICE,
      useClass: FieldService,
    },
  ],
  exports: [
    ROLE_SERVICE,
    PERMISSION_SERVICE,
    RESOURCE_SERVICE,
    ENDPOINT_SERVICE,
    ENTITY_SERVICE,
    FIELD_SERVICE,
  ],
})
export class AccessControlModule {}
