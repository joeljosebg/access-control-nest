import { Module } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({})
export class SwaggerAppModule {
  static configureSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Access Control API')
      .setDescription('API documentation for Access Control application')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    console.log('Swagger is running on /api-docs');
  }
}
