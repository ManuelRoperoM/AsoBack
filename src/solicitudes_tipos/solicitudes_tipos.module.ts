import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudesTipos } from './entities/solicitudes_tipos.entity';
import { SolicitudesTiposService } from './solicitudes_tipos.service';
import { SolicitudesTiposController } from './solicitudes_tipos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudesTipos])],
  controllers: [SolicitudesTiposController],
  providers: [SolicitudesTiposService],
  exports: [SolicitudesTiposService],
})
export class SolicitudesTiposModule {}
