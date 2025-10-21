import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramitesRelacion } from './entities/tramites_relacion.entity';
import { TramitesRelacionService } from './tramites_relacion.service';
import { TramitesRelacionController } from './tramites_relacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TramitesRelacion])],
  controllers: [TramitesRelacionController],
  providers: [TramitesRelacionService],
  exports: [TramitesRelacionService],
})
export class TramitesRelacionModule {}
