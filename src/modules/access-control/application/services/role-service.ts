import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';
import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';
import {
  CreateRoleDto,
  UpdateRoleDto,
} from '@/modules/access-control/application/dto/create-role.dto';
import { IRoleRepository } from '@/modules/access-control/domain/repositories/role-repository.interface';
import {
  PERMISSION_REPOSITORY,
  ROLE_REPOSITORY,
} from '@/modules/access-control/access-control.tokens';
import { IRolesService } from '@/modules/access-control/domain/interfaces/role-service.interface';
import { IPermissionService } from '@/modules/access-control/domain/interfaces/permission-service.interface';

@Injectable()
export class RoleService implements IRolesService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionService: IPermissionService,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const { permissionIds, ...roleWithoutPermissions } = createRoleDto;
    const permissions = await this.permissionService.findAll();
    const validPermissions = permissionIds.map((id) =>
      permissions.find((perm: PermissionEntity) => perm.id === id),
    );

    if (validPermissions.includes(undefined)) {
      throw new NotFoundException('One or more permissions not found');
    }

    const newRole = {
      ...roleWithoutPermissions,
      permissions: validPermissions,
    };

    return this.roleRepository.create(newRole);
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

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<void> {
    const { permissionIds, ...roleWithoutPermissions } = updateRoleDto;
    const role = await this.getById(id);
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }

    const permissions = await this.permissionService.findAll();
    const validPermissions = permissionIds.map((id) =>
      permissions.find((perm: PermissionEntity) => perm.id === id),
    );

    if (validPermissions.includes(undefined)) {
      throw new NotFoundException('One or more permissions not found');
    }

    const newRole = {
      ...roleWithoutPermissions,
      permissions: validPermissions,
    };

    console.log({ newRole });
    await this.roleRepository.update(id, newRole);
  }

  async delete(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
