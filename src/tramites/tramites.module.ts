import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tramite } from './entities/tramite.entity';
import { Observacion } from './entities/observacion.entity';
import { Historial } from './entities/historial.entity';
import { TramiteEstado } from '../tramite-estados/entities/tramite-estado.entity';
import { TramitesService } from './tramites.service';
import { TramitesController } from './tramites.controller';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Ciudad } from '../ciudades/entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tramite, Observacion, Historial, TramiteEstado, Usuario, Ciudad])],
  controllers: [TramitesController],
  providers: [TramitesService],
  exports: [TramitesService],
})
export class TramitesModule {}

