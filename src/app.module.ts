import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CiudadesModule } from './ciudades/ciudades.module';
import { DocumentosModule } from './documentos/documentos.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { ObservacionesModule } from './observaciones/observaciones.module';
import { RolesModule } from './roles/roles.module';
import { TramiteEstadosModule } from './tramite-estados/tramite-estados.module';
import { TramitesModule } from './tramites/tramites.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    // 🔹 ConfigModule global, disponible en toda la app
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 🔹 Conexión a la BD usando variables de entorno vía ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get<string>('DB_USER', 'root'),
        password: config.get<string>('DB_PASS', ''),
        database: config.get<string>('DB_NAME', 'asomunicipios_db'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),

    UsuariosModule,
    TramitesModule,
    RolesModule,
    CiudadesModule,
    MunicipiosModule,
    DocumentosModule,
    TramiteEstadosModule,
    ObservacionesModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
