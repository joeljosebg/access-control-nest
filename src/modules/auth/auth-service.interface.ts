import { LoginDto } from '@/modules/auth/login.dto';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { CreateUserWithOutRolesDto } from '@/modules/user/application/dto/create-user.dto';

export interface IAuthService {
  validateUser(loginDto: LoginDto): Promise<UserEntity | null>;
  validateUserId(userId: string): Promise<UserEntity | null>;
  refreshToken(refreshToken: string): { accessToken: string };
  login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string } | null>;
  signup(user: CreateUserWithOutRolesDto): Promise<UserEntity | null>;
}
