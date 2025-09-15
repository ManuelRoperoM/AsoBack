import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estado } from './entities/estados.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estado])],
})
export class EstadosModule {}
