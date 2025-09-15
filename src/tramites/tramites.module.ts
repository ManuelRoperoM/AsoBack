import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tramite } from './entities/tramites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tramite])],
})
export class TramitesModule {}
