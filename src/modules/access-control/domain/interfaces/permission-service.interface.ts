import { CreatePermissionDto } from '@/modules/access-control/application/dto/create-permission.dto';
import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';

export interface IPermissionService {
  findAll(): Promise<PermissionEntity[]>;
  getById(id: string): Promise<PermissionEntity>;
  create(permission: CreatePermissionDto): Promise<PermissionEntity>;
}
