import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { UserController } from './presentation/controllers/user.controller';

import { UserTypeOrmRepository } from './infrastructure/repositories/user-typeorm.repository';

import { USER_REPOSITORY, USER_SERVICE } from '@/modules/user/user.tokens';
import { UserService } from '@/modules/user/application/services/user.service';
import { BcryptModule } from '@/libs/bcrypt/bcrypt.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), BcryptModule],
  controllers: [UserController],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserTypeOrmRepository },
    { provide: USER_SERVICE, useClass: UserService },
  ],
  exports: [USER_SERVICE],
})
export class UserModule {}
