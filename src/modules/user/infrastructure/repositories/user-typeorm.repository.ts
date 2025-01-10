import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { IUserRepository } from '@/modules/user/domain/repositories/user-repository.interface';
import {
  CreateUserSaveDto,
  UpdateUserSaveDto,
} from '@/modules/user/application/dto/create-user.dto';
import { applyQueryOptions } from '@/utils/query-builder.util';
import { QueryOptionsDto } from '@/modules/shared/applications/dto/query-options.dto';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }

  async create(user: CreateUserSaveDto): Promise<UserEntity> {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  async findAll(queryOptions: QueryOptionsDto): Promise<UserEntity[]> {
    const query = this.repository.createQueryBuilder('users');
    applyQueryOptions(
      query,
      queryOptions,
      'users',
      UserEntity,
      this.dataSource,
    );

    const data = await query.getMany();
    return data;
  }
  async findAllPaginated(queryOptions: QueryOptionsDto): Promise<{
    data: UserEntity[];
    total: number;
  }> {
    const query = this.repository.createQueryBuilder('users');
    applyQueryOptions(
      query,
      queryOptions,
      'users',
      UserEntity,
      this.dataSource,
    );

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  async findOne(
    id: string,
    queryOptions: QueryOptionsDto,
  ): Promise<UserEntity | null> {
    const query = this.repository.createQueryBuilder('users');
    applyQueryOptions(
      query,
      {
        select: queryOptions.select,
        relations: queryOptions.relations,
      },
      'users',
      UserEntity,
      this.dataSource,
    );
    query.andWhere('users.id = :id', { id });
    return query.getOne();
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
