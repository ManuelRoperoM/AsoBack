import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ 1. Habilitar CORS antes de todo

  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
    : ['http://localhost:5173'];

  app.enableCors({
    origin: allowedOrigins, // frontend Vite
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // ✅ 2. Servir carpeta "dataset" (ya con CORS activo)
  const datasetPath = join(process.cwd(), 'dataset');
  app.use('/dataset', express.static(datasetPath));

  // ✅ 3. Prefijo global
  app.setGlobalPrefix('api', { exclude: ['/'] });

  // ✅ 4. Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ 5. Puerto
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000;

  await app.listen(port);
  console.log(`🚀 Servidor corriendo en: http://localhost:${port}/api`);
}

bootstrap();
