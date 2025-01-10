import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';
import { IPermissionRepository } from '@/modules/access-control/domain/repositories/permission-repository.interface';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
} from '../../application/dto/create-permission.dto';

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly repository: Repository<PermissionEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async create(permission: CreatePermissionDto): Promise<PermissionEntity> {
    return this.repository.save(permission);
  }

  findById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, permission: UpdatePermissionDto): Promise<void> {
    await this.repository.update(id, permission);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
