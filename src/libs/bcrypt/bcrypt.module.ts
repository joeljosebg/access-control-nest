import { Module } from '@nestjs/common';
import { BcryptService } from '@/libs/bcrypt/bcrypt.service';
import { BCRYPT_SERVICE } from '@/libs/bcrypt/bcrypt.token';

@Module({
  providers: [
    {
      provide: BCRYPT_SERVICE,
      useClass: BcryptService,
    },
  ],
  exports: [BCRYPT_SERVICE],
})
export class BcryptModule {}
