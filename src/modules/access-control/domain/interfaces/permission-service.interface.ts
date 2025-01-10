import { CreatePermissionDto } from '../../application/dto/create-permission.dto';
import { PermissionEntity } from '../entities/permission.entity';

export interface IPermissionService {
  findAll(): Promise<PermissionEntity[]>;
  getById(id: string): Promise<PermissionEntity>;
  create(permission: CreatePermissionDto): Promise<PermissionEntity>;
}
