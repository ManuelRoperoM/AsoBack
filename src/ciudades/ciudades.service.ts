import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { Municipio } from '../municipios/entities/municipio.entity';

@Injectable()
export class CiudadesService {
  constructor(@InjectRepository(Ciudad) private ciudadRepo: Repository<Ciudad>) {}

  async crear(dto: any) {
    const ciudad = this.ciudadRepo.create(dto);
    return this.ciudadRepo.save(ciudad);
  }

  async listar() {
    return this.ciudadRepo.find({ relations: ['municipio'] });
  }

  async obtener(id: number) {
    const c = await this.ciudadRepo.findOne({ where: { id_ciudad: id }, relations: ['municipio'] });
    if (!c) throw new NotFoundException('Ciudad no encontrada');
    return c;
  }

  async eliminar(id: number) {
    const c = await this.obtener(id);
    return this.ciudadRepo.remove(c);
  }
}

