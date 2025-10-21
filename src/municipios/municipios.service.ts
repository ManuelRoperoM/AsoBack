import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipios } from './entities/municipios.entity';
import { CreateMunicipiosDto } from './dto/create-municipios.dto';
import { UpdateMunicipiosDto } from './dto/update-municipios.dto';
import { successResponse } from '../common/response/response.helper';

@Injectable()
export class MunicipiosService {
  constructor(
    @InjectRepository(Municipios)
    private repo: Repository<Municipios>,
  ) {}

  create(dto: CreateMunicipiosDto) {
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

  update(id: number, dto: UpdateMunicipiosDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
