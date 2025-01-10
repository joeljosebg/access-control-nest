import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';
import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';
import { RoleRepository } from '@/modules/access-control/infrastructure/repositories/role.repository';
import { PermissionRepository } from '@/modules/access-control/infrastructure/repositories/permission.repository';

import {
  PERMISSION_REPOSITORY,
  PERMISSIONS_SERVICE,
  ROLE_REPOSITORY,
  ROLES_SERVICE,
} from './roles-permissions.tokens';
import { RolesController } from '@/modules/access-control/presentation/controllers/roles.controller';
import { PermissionsController } from '@/modules/access-control/presentation/controllers/permission.controller';
import { RoleService } from '@/modules/access-control/application/services/role.service';
import { PermissionService } from '@/modules/access-control/application/services/permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, PermissionEntity])],
  controllers: [RolesController, PermissionsController],
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
      provide: ROLES_SERVICE,
      useClass: RoleService,
    },
    {
      provide: PERMISSIONS_SERVICE,
      useClass: PermissionService,
    },
  ],
  exports: [ROLES_SERVICE, PERMISSIONS_SERVICE],
})
export class RolesPermissionsModule {}
