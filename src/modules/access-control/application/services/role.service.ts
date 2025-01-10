import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';
import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';
import { CreateRoleDto } from '@/modules/access-control/application/dto/create-role.dto';
import { IRoleRepository } from '@/modules/access-control/domain/repositories/role.repository';
import {
  PERMISSION_REPOSITORY,
  ROLE_REPOSITORY,
} from '../../roles-permissions.tokens';
import { IRolesService } from '../../domain/interfaces/role-service.interface';
import { IPermissionService } from '../../domain/interfaces/permission-service.interface';

@Injectable()
export class RoleService implements IRolesService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionService: IPermissionService,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const permissions = await this.permissionService.findAll();
    const validPermissions = createRoleDto.permissions.map((id) =>
      permissions.find((perm: PermissionEntity) => perm.id === id),
    );

    if (validPermissions.includes(undefined)) {
      throw new NotFoundException('One or more permissions not found');
    }

    const role = new RoleEntity();
    role.name = createRoleDto.name;
    role.permissions = validPermissions as any;

    return this.roleRepository.create(role);
  }

  async findAll(): Promise<RoleEntity[]> {
    return this.roleRepository.findAll();
  }

  async getById(id: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }
    return role;
  }
}
