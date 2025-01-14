import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { LoginDto } from '@/modules/auth/login.dto';
import { IUserService } from '@/modules/user/domain/interfaces/user-service.interface';
import { USER_SERVICE } from '@/modules/user/user.tokens';
import { IAuthService } from '@/modules/auth/auth-service.interface';
import { BCRYPT_SERVICE } from '@/libs/bcrypt/bcrypt.token';
import { IBcryptService } from '@/libs/bcrypt/bcrypt-service.interface';
import { IJwtService } from '@/libs/jwt/jwt-service.interface';
import { JWT_SERVICE } from '@/libs/jwt/jwt.module';
import { UserEntity } from '../user/domain/entities/user.entity';
import { CreateUserWithOutRolesDto } from '../user/application/dto/create-user.dto';
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(BCRYPT_SERVICE) private bcryptService: IBcryptService,
    @Inject(JWT_SERVICE) private jwtService: IJwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<UserEntity | null> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (user) {
      return user;
    }

    throw null;
  }
  async validateUserId(userId: string): Promise<UserEntity | null> {
    const user = await this.userService.findById(userId);
    if (user) {
      return user;
    }

    throw null;
  }
  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    const user = await this.userService.findByEmail(loginDto.email);
    if (
      user &&
      (await this.bcryptService.compare(loginDto.password, user.password))
    ) {
      const token = this.jwtService.generateToken(
        { id: user.id, email: user.email, username: user.username },
        '1h',
      );

      const refreshToken = this.jwtService.generateToken(
        { id: user.id, email: user.email, username: user.username },
        '7d',
      );
      return { accessToken: token, refreshToken };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async signup(user: CreateUserWithOutRolesDto): Promise<UserEntity | null> {
    const newUser = await this.userService.create({
      ...user,
      rolesIds: ['d8be3d49-df66-4293-ab64-b8bd381d6b4c'],
    });
    if (newUser) {
      return newUser;
    }

    throw null;
  }

  refreshToken(refreshToken: string): { accessToken: string } {
    const decoded = this.jwtService.verify(refreshToken);
    if (!decoded) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    console.log({ decoded });
    const token = this.jwtService.generateToken(
      {
        id: decoded.id,
        email: decoded.email,
        username: decoded.username,
      },
      '1h',
    );
    return { accessToken: token };
  }
}
