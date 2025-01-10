import { LoginDto } from '@/modules/auth/login.dto';

export interface IAuthService {
  validateUser(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string } | null>;
  refreshToken(refreshToken: string): { accessToken: string };
}
