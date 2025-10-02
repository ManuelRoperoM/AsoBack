import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadesService } from './ciudades.service';
import { CiudadesController } from './ciudades.controller';
import { Municipio } from '../municipios/entities/municipio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad, Municipio])],
  providers: [CiudadesService],
  controllers: [CiudadesController],
  exports: [CiudadesService],
})
export class CiudadesModule {}

