import {
  Controller,
  Post,
  Body,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RefreshTokenDto } from '@/modules/auth/login.dto';
import { AUTH_SERVICE } from '@/modules/auth/auth.tokens';
import { IAuthService } from '@/modules/auth/auth-service.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
@Injectable()
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return { message: 'Login successful', ...user };
  }
  @Post('refresh-token') // Nuevo endpoint para refresh token
  async refreshToken(
    @Body() body: RefreshTokenDto,
  ): Promise<{ accessToken: string }> {
    const { refreshToken } = body;

    const newToken = this.authService.refreshToken(refreshToken);
    return { accessToken: newToken.accessToken };
  }
}
