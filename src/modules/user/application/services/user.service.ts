import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@/modules/user/domain/repositories/user-repository.interface';

import { IUserService } from '@/modules/user/domain/interfaces/user-service.interface';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@/modules/user/application/dto/create-user.dto';

import { USER_REPOSITORY } from '@/modules/user/user.tokens';
import { BCRYPT_SERVICE } from '@/libs/bcrypt/bcrypt.token';
import { IBcryptService } from '@/libs/bcrypt/bcrypt-service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(BCRYPT_SERVICE)
    private readonly bcryptService: IBcryptService,
  ) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
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
    return this.userRepository.create({ ...user, password: hashedPassword });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  async update(id: string, user: UpdateUserDto): Promise<UserEntity> {
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
        ...user,
        password: hashedPassword,
      });
    }
    return this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }
}
