import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observacion } from './entities/observacion.entity';
import { ObservacionesService } from './observaciones.service';
import { ObservacionesController } from './observaciones.controller';
import { Tramite } from '../tramites/entities/tramite.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { TramiteEstado } from '../tramite-estados/entities/tramite-estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Observacion, Tramite, Usuario, TramiteEstado])],
  providers: [ObservacionesService],
  controllers: [ObservacionesController],
  exports: [ObservacionesService],
})
export class ObservacionesModule {}

