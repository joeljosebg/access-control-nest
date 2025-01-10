import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app.module';
import { SwaggerAppModule } from '@/libs/swagger/swagger.module';
import { HttpExceptionFilter } from '@/modules/shared/applications/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerAppModule.configureSwagger(app);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3500);
}
bootstrap();
