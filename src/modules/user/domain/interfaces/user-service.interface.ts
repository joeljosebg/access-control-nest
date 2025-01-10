import { QueryOptionsDto } from '@/modules/shared/applications/dto/query-options.dto';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '@/modules/user/application/dto/create-user.dto';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export interface IUserService {
  create(user: CreateUserDto): Promise<UserEntity>;
  findAll(queryOptions: QueryOptionsDto): Promise<UserResponseDto[]>;
  findAllPaginated(queryOptions: QueryOptionsDto): Promise<{
    data: UserResponseDto[];
    total: number;
  }>;
  findById(id: string): Promise<UserEntity | null>;
  findOne(
    id: string,
    queryOptions: QueryOptionsDto,
  ): Promise<UserResponseDto | null>;
  update(id: string, user: UpdateUserDto): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
