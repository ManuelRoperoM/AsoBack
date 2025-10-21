import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CiudadesModule } from './ciudades/ciudades.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { TramitesModule } from './tramites/tramites.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TramitesRelacionModule } from './tramites_relacion/tramites_relacion.module';
import { SolicitantesTiposModule } from './solicitantes_tipos/solicitantes_tipos.module';

@Module({
  imports: [
    // 🔹 Configuración global del entorno (.env)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 🔹 Conexión a MySQL usando variables del entorno
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
        synchronize: true,
        timezone: 'America/Bogota', // ⬅️ Importante
        // 👇 CLAVE: codificación correcta
        charset: 'utf8mb4_general_ci',

        // Opcional: para asegurar compatibilidad con emojis o ñ
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
      }),
    }),

    // 🔹 Módulos activos
    UsuariosModule,
    TramitesModule,
    CiudadesModule,
    MunicipiosModule,
    TramitesRelacionModule,
    SolicitantesTiposModule,
  ],
})
export class AppModule {}
