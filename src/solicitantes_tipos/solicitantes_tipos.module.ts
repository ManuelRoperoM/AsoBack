import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitantesTipos } from './entities/solicitantes_tipos.entity';
import { SolicitantesTiposService } from './solicitantes_tipos.service';
import { SolicitantesTiposController } from './solicitantes_tipos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitantesTipos])],
  controllers: [SolicitantesTiposController],
  providers: [SolicitantesTiposService],
  exports: [SolicitantesTiposService],
})
export class SolicitantesTiposModule {}
