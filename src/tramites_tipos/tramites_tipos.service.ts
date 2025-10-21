import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TramitesTipos } from './entities/tramites_tipos.entity';
import { CreateTramitesTiposDto } from './dto/create-tramites_tipos.dto';
import { UpdateTramitesTiposDto } from './dto/update-tramites_tipos.dto';

@Injectable()
export class TramitesTiposService {
  constructor(
    @InjectRepository(TramitesTipos)
    private repo: Repository<TramitesTipos>,
  ) {}

  create(dto: CreateTramitesTiposDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateTramitesTiposDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
