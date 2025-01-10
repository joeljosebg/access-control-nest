import { Module } from '@nestjs/common';

import { BcryptModule } from '@/libs/bcrypt/bcrypt.module';
import { UserModule } from '../user/user.module';
import { AUTH_SERVICE } from './auth.tokens';
import { AuthController } from './auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtConfigModule } from '@/libs/jwt/jwt.module';
@Module({
  imports: [UserModule, BcryptModule, JwtConfigModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
