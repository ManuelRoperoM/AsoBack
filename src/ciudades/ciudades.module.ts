import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudades } from './entities/ciudades.entity';
import { CiudadesService } from './ciudades.service';
import { CiudadesController } from './ciudades.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudades])],
  controllers: [CiudadesController],
  providers: [CiudadesService],
  exports: [CiudadesService],
})
export class CiudadesModule {}
