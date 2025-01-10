import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';
import {
  CreateRoleSaveDto,
  UpdateRoleSaveDto,
} from '../../application/dto/create-role.dto';

export interface IRoleRepository {
  findAll(): Promise<RoleEntity[]>;
  findById(id: string): Promise<RoleEntity>;
  create(role: CreateRoleSaveDto): Promise<RoleEntity>;
  update(id: string, role: UpdateRoleSaveDto): Promise<void>;
  delete(id: string): Promise<void>;
}
