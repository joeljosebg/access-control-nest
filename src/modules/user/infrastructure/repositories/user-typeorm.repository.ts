import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { IUserRepository } from '@/modules/user/domain/repositories/user-repository.interface';
import {
  CreateUserSaveDto,
  UpdateUserSaveDto,
} from '../../application/dto/create-user.dto';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }

  async create(user: CreateUserSaveDto): Promise<UserEntity> {
    console.log({ user });
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, user: UpdateUserSaveDto): Promise<UserEntity> {
    await this.repository.update(id, user);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ email });
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ username });
  }
}
