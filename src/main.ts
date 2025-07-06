import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Enable validation globally with better error messages
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: { enableImplicitConversion: true },
  }));
  
  // Enable CORS for frontend access
  app.enableCors();
  
  // Serve static files from the public directory
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Flight Booking API')
    .setDescription('API documentation for the Flight Booking System')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('flights', 'Flight search and information')
    .addTag('bookings', 'Booking management')
    .addTag('tickets', 'Ticket operations')
    .addTag('users', 'User profile and preferences')
    .addTag('flight-status', 'Real-time flight status updates')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header'
    })
    .build();
  
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    extraModels: [
      // Add any additional models that might not be automatically discovered
    ]
  });
  
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    }
  });

  await app.listen(process.env.PORT ?? 5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
