import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudades } from './entities/ciudades.entity';
import { CreateCiudadesDto } from './dto/create-ciudades.dto';
import { UpdateCiudadesDto } from './dto/update-ciudades.dto';
import { successResponse } from '../common/response/response.helper';

@Injectable()
export class CiudadesService {
  constructor(
    @InjectRepository(Ciudades)
    private repo: Repository<Ciudades>,
  ) {}

  create(dto: CreateCiudadesDto) {
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

  update(id: number, dto: UpdateCiudadesDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
