import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';

export interface IRoleRepository {
  findAll(): Promise<RoleEntity[]>;
  findById(id: string): Promise<RoleEntity>;
  create(role: RoleEntity): Promise<RoleEntity>;
}
