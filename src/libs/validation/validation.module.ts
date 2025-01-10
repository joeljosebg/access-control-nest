import { Module, Global } from '@nestjs/common';
import { createValidationPipe } from '@/libs/validation/validation-pipe.config';

@Global()
@Module({
  providers: [
    {
      provide: 'APP_PIPE', // Proveedor global para el ValidationPipe
      useFactory: createValidationPipe,
    },
  ],
  exports: [], // No es necesario exportar nada adicional
})
export class ValidationModule {}
