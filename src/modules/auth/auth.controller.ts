import {
  Controller,
  Post,
  Body,
  Inject,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto, RefreshTokenDto } from '@/modules/auth/login.dto';
import { AUTH_SERVICE } from '@/modules/auth/auth.tokens';
import { IAuthService } from '@/modules/auth/auth-service.interface';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  CreateUserWithOutRolesDto,
} from '../user/application/dto/create-user.dto';

@ApiTags('Auth')
@Controller('api/auth') // TODO: change to /api/auth
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

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserWithOutRolesDto) {
    const user = await this.authService.signup(createUserDto);
    return { message: 'User created successfully', ...user };
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: RefreshTokenDto,
  ): Promise<{ accessToken: string }> {
    const { refreshToken } = body;

    const newToken = this.authService.refreshToken(refreshToken);
    return { accessToken: newToken.accessToken };
  }
}
