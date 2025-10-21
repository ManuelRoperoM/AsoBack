import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TramitesRelacion } from './entities/tramites_relacion.entity';
import { CreateTramitesRelacionDto } from './dto/create-tramites_relacion.dto';
import { UpdateTramitesRelacionDto } from './dto/update-tramites_relacion.dto';

import { successResponse } from '../common/response/response.helper';

@Injectable()
export class TramitesRelacionService {
  constructor(
    @InjectRepository(TramitesRelacion)
    private readonly repo: Repository<TramitesRelacion>,
  ) {}

  async create(dto: CreateTramitesRelacionDto) {
    const nuevaRelacion = this.repo.create({
      tramiteTipo: { id: dto.tramites_tipos_id },
      solicitudTipo: { id: dto.solicitudes_tipos_id },
    });
    return await this.repo.save(nuevaRelacion);
  }

  async findAll() {
    const data = await this.repo.find({
      relations: ['tramiteTipo', 'solicitudTipo'],
    });

    if (!data || data.length === 0) {
      return successResponse([], 'No hay registros disponibles', 204);
    }

    return successResponse(data, 'Consulta exitosa', 200);
  }

  async findOne(id: number) {
    const data = await this.repo.findOne({
      where: { id },
      relations: ['tramiteTipo', 'solicitudTipo'],
    });
    if (!data) {
      return successResponse([], 'No hay registros disponibles', 204);
    }

    return successResponse(data, 'Consulta exitosa', 200);
  }

  async update(id: number, dto: UpdateTramitesRelacionDto) {
    return await this.repo.update(id, {
      tramiteTipo: { id: dto.tramites_tipos_id },
      solicitudTipo: { id: dto.solicitudes_tipos_id },
    });
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
