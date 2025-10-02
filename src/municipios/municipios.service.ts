import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipio } from './entities/municipio.entity';

@Injectable()
export class MunicipiosService {
  constructor(@InjectRepository(Municipio) private municipioRepo: Repository<Municipio>) {}

  async crear(dto: any) {
    const m = this.municipioRepo.create(dto);
    return this.municipioRepo.save(m);
  }

  async listar() {
    return this.municipioRepo.find();
  }

  async obtener(id: number) {
    const m = await this.municipioRepo.findOne({ where: { id_municipio: id } });
    if (!m) throw new NotFoundException('Municipio no encontrado');
    return m;
  }

  async eliminar(id: number) {
    const m = await this.obtener(id);
    return this.municipioRepo.remove(m);
  }
}

