import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramitesTipos } from './entities/tramites_tipos.entity';
import { TramitesTiposService } from './tramites_tipos.service';
import { TramitesTiposController } from './tramites_tipos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TramitesTipos])],
  controllers: [TramitesTiposController],
  providers: [TramitesTiposService],
  exports: [TramitesTiposService],
})
export class TramitesTiposModule {}
