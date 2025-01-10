import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerAppModule } from './libs/swagger/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerAppModule.configureSwagger(app);

  await app.listen(3500);
}
bootstrap();
