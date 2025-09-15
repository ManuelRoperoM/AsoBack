import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipio } from './entities/municipios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Municipio])],
})
export class MunicipiosModule {}
