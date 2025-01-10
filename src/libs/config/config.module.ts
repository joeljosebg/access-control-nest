import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema } from '@/libs/config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hacer disponible el módulo en toda la aplicación
      validate: (config) => {
        const parsed = envSchema.safeParse(config);
        if (!parsed.success) {
          console.error(
            'Invalid environment variables:',
            parsed.error.format(),
          );
          throw new Error('Environment validation failed');
        }
        return parsed.data;
      },
    }),
  ],
  providers: [],
  exports: [ConfigModule],
})
export class ConfigAppModule {}
