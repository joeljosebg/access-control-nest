import { LoginDto } from '@/modules/auth/login.dto';
import { UserEntity } from '../user/domain/entities/user.entity';

export interface IAuthService {
  validateUser(loginDto: LoginDto): Promise<UserEntity | null>;
  validateUserId(userId: string): Promise<UserEntity | null>;
  refreshToken(refreshToken: string): { accessToken: string };
  login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string } | null>;
}
