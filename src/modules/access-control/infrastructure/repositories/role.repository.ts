import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';
import { IRoleRepository } from '@/modules/access-control/domain/repositories/role-repository.interface';
import {
  CreateRoleSaveDto,
  UpdateRoleSaveDto,
} from '@/modules/access-control/application/dto/create-role.dto';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {}

  findAll() {
    return this.repository.find({ relations: ['permissions'] });
  }

  findById(id: string) {
    return this.repository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async create(role: CreateRoleSaveDto): Promise<RoleEntity> {
    return this.repository.save(role);
  }

  async update(id: string, role: UpdateRoleSaveDto): Promise<void> {
    const existingRole = await this.repository.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (!existingRole) {
      throw new Error('Role not found');
    }

    existingRole.name = role.name;

    if (role.permissions) {
      existingRole.permissions = role.permissions;
    }

    await this.repository.save(existingRole);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
