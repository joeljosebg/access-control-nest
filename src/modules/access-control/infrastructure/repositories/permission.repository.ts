import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';
import { IPermissionRepository } from '@/modules/access-control/domain/repositories/permission.repository';

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly repository: Repository<PermissionEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  create(permission: PermissionEntity) {
    return this.repository.save(permission);
  }

  findById(id: string) {
    return this.repository.findOne({ where: { id } });
  }
}
