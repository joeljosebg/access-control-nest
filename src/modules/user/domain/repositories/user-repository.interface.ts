import {
  CreateUserSaveDto,
  UpdateUserSaveDto,
} from '@/modules/user/application/dto/create-user.dto';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export interface IUserRepository {
  create(user: CreateUserSaveDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | null>;
  update(id: string, user: UpdateUserSaveDto): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
}
