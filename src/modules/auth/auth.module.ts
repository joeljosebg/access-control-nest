import { forwardRef, Module } from '@nestjs/common';

import { BcryptModule } from '@/libs/bcrypt/bcrypt.module';
import { UserModule } from '../user/user.module';
import { AUTH_SERVICE } from './auth.tokens';
import { AuthController } from './auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtConfigModule } from '@/libs/jwt/jwt.module';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { JwtStrategy } from '@/modules/auth/jwt.strategy';
@Module({
  imports: [forwardRef(() => UserModule), BcryptModule, JwtConfigModule],
  controllers: [AuthController],
  providers: [
    JwtAuthGuard,
    JwtStrategy,
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
  exports: [JwtAuthGuard, AUTH_SERVICE],
})
export class AuthModule {}
