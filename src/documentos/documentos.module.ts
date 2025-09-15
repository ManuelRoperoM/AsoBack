import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documento } from './entities/documentos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Documento])],
})
export class DocumentosModule {}
