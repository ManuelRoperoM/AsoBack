import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Titular } from './entities/titulares.entity';
import { TitularesService } from './titulares.service';
import { TitularesController } from './titulares.controller';
import { Tramite } from 'src/tramites/entities/tramites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Titular, Tramite])],
  controllers: [TitularesController],
  providers: [TitularesService],
  exports: [TitularesService],
})
export class TitularesModule {}
