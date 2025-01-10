import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { UserController } from './presentation/controllers/user.controller';

import { UserTypeOrmRepository } from './infrastructure/repositories/user-typeorm.repository';

import { USER_REPOSITORY, USER_SERVICE } from '@/modules/user/user.tokens';
import { UserService } from '@/modules/user/application/services/user.service';
import { BcryptModule } from '@/libs/bcrypt/bcrypt.module';
import { AccessControlModule } from '@/modules/access-control/access-control.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    BcryptModule,
    forwardRef(() => AuthModule),
    forwardRef(() => AccessControlModule),
  ],
  controllers: [UserController],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserTypeOrmRepository },
    { provide: USER_SERVICE, useClass: UserService },
  ],
  exports: [USER_SERVICE],
})
export class UserModule {}
