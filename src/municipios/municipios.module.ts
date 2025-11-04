import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipios } from './entities/municipios.entity';
import { MunicipiosService } from './municipios.service';
import { MunicipiosController } from './municipios.controller';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Municipios, Usuario])],
  controllers: [MunicipiosController],
  providers: [MunicipiosService],
  exports: [MunicipiosService],
})
export class MunicipiosModule {}
