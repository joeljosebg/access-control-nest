import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '@/modules/user/domain/repositories/user-repository.interface';

import { IUserService } from '@/modules/user/domain/interfaces/user-service.interface';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '@/modules/user/application/dto/create-user.dto';

import { USER_REPOSITORY } from '@/modules/user/user.tokens';
import { BCRYPT_SERVICE } from '@/libs/bcrypt/bcrypt.token';
import { IBcryptService } from '@/libs/bcrypt/bcrypt-service.interface';
import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';
import { ROLE_SERVICE } from '@/modules/access-control/access-control.tokens';
import { IRolesService } from '@/modules/access-control/domain/interfaces/role-service.interface';
import { QueryOptionsDto } from '@/modules/shared/applications/dto/query-options.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(BCRYPT_SERVICE)
    private readonly bcryptService: IBcryptService,
    @Inject(ROLE_SERVICE)
    private readonly roleService: IRolesService,
  ) {}

  async create(user: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    const { rolesIds, ...userWithoutRoles } = user;
    const hashedPassword = await this.bcryptService.hash(user.password);
    // validate email
    const email = await this.userRepository.findByEmail(user.email);
    if (email) {
      throw new BadRequestException('Email already exists');
    }
    const username = await this.userRepository.findByUsername(user.username);
    if (username) {
      throw new BadRequestException('Username already exists');
    }
    const roles = await this.roleService.findAll();
    const validRoles = rolesIds.map((id) =>
      roles.find((role: RoleEntity) => role.id === id),
    );

    if (validRoles.includes(undefined)) {
      throw new NotFoundException('One or more roles not found');
    }

    const newUser = {
      ...userWithoutRoles,
      password: hashedPassword,
      roles: validRoles,
    };

    const createdUser = await this.userRepository.create(newUser);
    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword as Omit<UserEntity, 'password'>;
  }

  async findAll(queryOptions: QueryOptionsDto): Promise<UserResponseDto[]> {
    const data = await this.userRepository.findAll(queryOptions);
    return data.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as UserResponseDto;
    });
  }
  async findAllPaginated(queryOptions: QueryOptionsDto): Promise<{
    data: UserResponseDto[];
    total: number;
  }> {
    const users = await this.userRepository.findAllPaginated(queryOptions);
    return {
      data: users.data.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword as UserResponseDto;
      }),
      total: users.total,
    };
  }

  async findOne(
    id: string,
    queryOptions: QueryOptionsDto,
  ): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOne(id, queryOptions);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserResponseDto;
  }
  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  async update(id: string, user: UpdateUserDto): Promise<UserEntity> {
    const userEntity = await this.userRepository.findById(id);
    if (!userEntity) {
      throw new NotFoundException('User not found');
    }
    const email = await this.userRepository.findByEmail(user.email);
    if (email && email.id !== id) {
      throw new BadRequestException('Email already exists');
    }

    const username = await this.userRepository.findByUsername(user.username);
    if (username && username.id !== id) {
      throw new BadRequestException('Username already exists');
    }

    if (user.password) {
      const hashedPassword = await this.bcryptService.hash(user.password);
      return this.userRepository.update(id, {
        ...userEntity,
        password: hashedPassword,
      });
    }

    const roles = await this.roleService.findAll();
    const validRoles = user.rolesIds.map((id) =>
      roles.find((role: RoleEntity) => role.id === id),
    );

    if (validRoles.includes(undefined)) {
      throw new NotFoundException('One or more roles not found');
    }

    userEntity.roles = validRoles as any;

    return this.userRepository.update(id, userEntity);
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }
}
