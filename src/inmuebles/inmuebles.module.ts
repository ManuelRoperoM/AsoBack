import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InmueblesService } from './inmuebles.service';
import { InmueblesController } from './inmuebles.controller';
import { Inmueble } from './entities/inmuebles.entity';
import { Tramite } from '../tramites/entities/tramites.entity';
import { Municipios } from '../municipios/entities/municipios.entity';
import { Ciudades } from '../ciudades/entities/ciudades.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inmueble, Tramite, Municipios, Ciudades]),
  ],
  controllers: [InmueblesController],
  providers: [InmueblesService],
  exports: [InmueblesService],
})
export class InmueblesModule {}
