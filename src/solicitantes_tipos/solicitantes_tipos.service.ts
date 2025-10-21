import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitantesTipos } from './entities/solicitantes_tipos.entity';
import { CreateSolicitantesTiposDto } from './dto/create-solicitantes_tipos.dto';
import { UpdateSolicitantesTiposDto } from './dto/update-solicitantes_tipos.dto';
import { successResponse } from '../common/response/response.helper';

@Injectable()
export class SolicitantesTiposService {
  constructor(
    @InjectRepository(SolicitantesTipos)
    private repo: Repository<SolicitantesTipos>,
  ) {}

  create(dto: CreateSolicitantesTiposDto) {
    return this.repo.save(dto);
  }

  async findAll() {
    const data = await this.repo.find();

    if (!data || data.length === 0) {
      return successResponse([], 'No hay registros disponibles', 204);
    }
    return successResponse(data, 'Consulta exitosa', 200);
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateSolicitantesTiposDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
