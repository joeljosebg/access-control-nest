import { Module } from '@nestjs/common';
import { ConfigAppModule } from '@/libs/config/config.module';
import { DatabaseModule } from '@/libs/database/database.module';
import { ValidationModule } from '@/libs/validation/validation.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { AccessControlModule } from '@/modules/access-control/access-control.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ConfigAppModule,
    ValidationModule,
    UserModule,
    AccessControlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
