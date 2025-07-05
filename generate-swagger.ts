import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './src/app.module';
import * as fs from 'fs';
import * as path from 'path';

async function generateSwaggerJson() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Flight Booking API')
    .setDescription('API documentation for the Flight Booking System')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('flights', 'Flight search and information')
    .addTag('bookings', 'Booking management')
    .addTag('tickets', 'Ticket operations')
    .addTag('users', 'User profile and preferences')
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
      // Include any classes that might not be automatically discovered
    ]
  });
  
  const outputPath = path.resolve(process.cwd(), 'swagger-spec.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
  
  console.log(`Swagger JSON file has been generated at: ${outputPath}`);
  
  await app.close();
}

generateSwaggerJson();
