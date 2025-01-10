import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';

export interface IPermissionRepository {
  findAll(): Promise<PermissionEntity[]>;
  findById(id: string): Promise<PermissionEntity>;
  create(permission: PermissionEntity): Promise<PermissionEntity>;
}
