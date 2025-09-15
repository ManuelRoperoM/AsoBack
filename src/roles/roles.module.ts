import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])],
})
export class RolesModule {}
