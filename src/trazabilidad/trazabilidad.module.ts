import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trazabilidad } from './entities/trazabilidad.entity';
import { TrazabilidadService } from './trazabilidad.service';
import { TrazabilidadController } from './trazabilidad.controller';
import { Tramite } from '../tramites/entities/tramites.entity'; // ✅ ruta corregida
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trazabilidad, Tramite, Usuario])],
  controllers: [TrazabilidadController],
  providers: [TrazabilidadService],
  exports: [TrazabilidadService],
})
export class TrazabilidadModule {}
