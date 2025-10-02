import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramiteEstado } from './entities/tramite-estado.entity';
import { TramiteEstadosService } from './tramite-estados.service';
import { TramiteEstadosController } from './tramite-estados.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TramiteEstado])],
  providers: [TramiteEstadosService],
  controllers: [TramiteEstadosController],
  exports: [TramiteEstadosService],
})
export class TramiteEstadosModule {}

