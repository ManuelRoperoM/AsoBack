import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipio } from './entities/municipio.entity';
import { MunicipiosService } from './municipios.service';
import { MunicipiosController } from './municipios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Municipio])],
  providers: [MunicipiosService],
  controllers: [MunicipiosController],
  exports: [MunicipiosService],
})
export class MunicipiosModule {}

