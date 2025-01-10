import { CreateRoleDto } from '@/modules/access-control/application/dto/create-role.dto';
import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';

export interface IRolesService {
  create(createRoleDto: CreateRoleDto): Promise<RoleEntity>;
  findAll(): Promise<RoleEntity[]>;
  getById(id: string): Promise<RoleEntity>;
}
