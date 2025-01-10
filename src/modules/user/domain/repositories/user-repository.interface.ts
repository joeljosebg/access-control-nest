import { QueryOptionsDto } from '@/modules/shared/applications/dto/query-options.dto';
import {
  CreateUserSaveDto,
  UpdateUserSaveDto,
} from '@/modules/user/application/dto/create-user.dto';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export interface IUserRepository {
  create(user: CreateUserSaveDto): Promise<UserEntity>;
  findAll(queryOptions: QueryOptionsDto): Promise<UserEntity[]>;
  findAllPaginated(queryOptions: QueryOptionsDto): Promise<{
    data: UserEntity[];
    total: number;
  }>;
  findById(id: string): Promise<UserEntity | null>;
  findOne(
    id: string,
    queryOptions: QueryOptionsDto,
  ): Promise<UserEntity | null>;
  update(id: string, user: UpdateUserSaveDto): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
}
