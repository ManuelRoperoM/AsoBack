import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Prefijo global para todos los endpoints
  app.setGlobalPrefix('api', {
    exclude: ['/'], // puedes excluir rutas públicas si lo deseas
  });

  // ✅ Validaciones globales para todos los DTOs
  // ✅ Activa validaciones globales en todos los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos no definidos en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan campos no permitidos
      transform: true, // convierte los payloads a instancias de las clases DTO
    }),
  );

  // ✅ Permite CORS (opcional pero recomendado)
  app.enableCors({
    origin: '*', // puedes restringirlo a dominios específicos si lo prefieres
  });

  // ✅ Obtiene el puerto desde variables de entorno
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000;

  await app.listen(port);
  console.log(`🚀 Servidor corriendo en: http://localhost:${port}/api`);
}

bootstrap();
