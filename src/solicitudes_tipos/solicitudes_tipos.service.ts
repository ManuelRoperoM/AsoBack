import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudesTipos } from './entities/solicitudes_tipos.entity';
import { CreateSolicitudesTiposDto } from './dto/create-solicitudes_tipos.dto';
import { UpdateSolicitudesTiposDto } from './dto/update-solicitudes_tipos.dto';

@Injectable()
export class SolicitudesTiposService {
  constructor(
    @InjectRepository(SolicitudesTipos)
    private repo: Repository<SolicitudesTipos>,
  ) {}

  create(dto: CreateSolicitudesTiposDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateSolicitudesTiposDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
