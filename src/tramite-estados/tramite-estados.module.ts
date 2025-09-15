import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramiteEstado } from './entities/tramite-estados.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TramiteEstado])],
})
export class TramiteEstadosModule {}
