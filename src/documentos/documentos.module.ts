import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documento } from './entities/documento.entity';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { Tramite } from 'src/tramites/entities/tramites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Documento, Tramite])],
  controllers: [DocumentosController],
  providers: [DocumentosService],
  exports: [DocumentosService],
})
export class DocumentosModule {}
