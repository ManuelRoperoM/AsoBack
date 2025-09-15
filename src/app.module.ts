import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { ObservacionesModule } from './observaciones/observaciones.module';
import { TramiteEstadosModule } from './tramite-estados/tramite-estados.module';
import { EstadosModule } from './estados/estados.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { TramitesModule } from './tramites/tramites.module';
import { DocumentosModule } from './documentos/documentos.module';
import { Documento } from './documentos/entities/documentos.entity';
import { Estado } from './estados/entities/estados.entity';
import { Municipio } from './municipios/entities/municipios.entity';
import { Observacion } from './observaciones/entities/observaciones.entity';
import { Rol } from './roles/entities/roles.entity';
import { TramiteEstado } from './tramite-estados/entities/tramite-estados.entity';
import { Tramite } from './tramites/entities/tramites.entity';
import { Usuario } from './usuarios/entities/usuarios.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'mysql'>('DB_TYPE'),
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [
          Documento,
          Estado,
          Municipio,
          Observacion,
          Rol,
          TramiteEstado,
          Tramite,
          Usuario,
        ],
        synchronize: true,
      }),
    }),
    RolesModule,
    UsuariosModule,
    MunicipiosModule,
    EstadosModule,
    TramitesModule,
    TramiteEstadosModule,
    ObservacionesModule,
    DocumentosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
