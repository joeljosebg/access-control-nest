import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';
import { IPermissionService } from '@/modules/access-control/domain/interfaces/permission-service.interface';
import { PERMISSION_REPOSITORY } from '@/modules/access-control/access-control.tokens';
import { IPermissionRepository } from '@/modules/access-control/domain/repositories/permission-repository.interface';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
} from '../dto/create-permission.dto';

@Injectable()
export class PermissionService implements IPermissionService {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: IPermissionRepository,
  ) {}

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionEntity> {
    const permission = new PermissionEntity();
    permission.name = createPermissionDto.name;
    permission.description = createPermissionDto.description;
    permission.resource = createPermissionDto.resource;
    permission.action = createPermissionDto.action;
    permission.condition = createPermissionDto.condition;

    return this.permissionRepository.create(permission);
  }

  async findAll(): Promise<PermissionEntity[]> {
    return this.permissionRepository.findAll();
  }

  async getById(id: string): Promise<PermissionEntity> {
    const permission = await this.permissionRepository.findAll();
    const found = permission.find((perm) => perm.id === id);

    if (!found) {
      throw new NotFoundException(`Permission with ID "${id}" not found`);
    }
    return found;
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<void> {
    const permission = await this.getById(id);
    permission.name = updatePermissionDto.name;
    await this.permissionRepository.update(id, permission);
  }

  async delete(id: string): Promise<void> {
    await this.permissionRepository.delete(id);
  }
}
