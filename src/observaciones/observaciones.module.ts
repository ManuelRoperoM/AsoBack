import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observacion } from './entities/observaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Observacion])],
})
export class ObservacionesModule {}
