import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@/libs/jwt/jwt.service';
export const JWT_SERVICE = Symbol('JWT_SERVICE');

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: JWT_SERVICE,
      useClass: JwtService,
    },
  ],
  exports: [JWT_SERVICE],
})
export class JwtConfigModule {}
