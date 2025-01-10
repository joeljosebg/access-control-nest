import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
} from '@/modules/access-control/application/dto/create-permission.dto';

export interface IPermissionRepository {
  findAll(): Promise<PermissionEntity[]>;
  findById(id: string): Promise<PermissionEntity>;
  create(permission: CreatePermissionDto): Promise<PermissionEntity>;
  update(id: string, permission: UpdatePermissionDto): Promise<void>;
  delete(id: string): Promise<void>;
}
