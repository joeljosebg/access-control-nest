import {
  CreateRoleDto,
  UpdateRoleDto,
} from '@/modules/access-control/application/dto/create-role.dto';
import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';

export interface IRolesService {
  create(createRoleDto: CreateRoleDto): Promise<RoleEntity>;
  findAll(): Promise<RoleEntity[]>;
  getById(id: string): Promise<RoleEntity>;

  update(id: string, updateRoleDto: UpdateRoleDto): Promise<void>;
  delete(id: string): Promise<void>;
}
