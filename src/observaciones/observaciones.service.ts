import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observacion } from './entities/observacion.entity';

@Injectable()
export class ObservacionesService {
  constructor(@InjectRepository(Observacion) private obsRepo: Repository<Observacion>) {}

  async crear(dto: any) {
    const o = this.obsRepo.create(dto);
    return this.obsRepo.save(o);
  }

  async listar() {
    return this.obsRepo.find({ relations: ['tramite', 'autor', 'estado'] });
  }

  async obtener(id: number) {
    const o = await this.obsRepo.findOne({ where: { id_observacion: id }, relations: ['tramite', 'autor', 'estado'] });
    if (!o) throw new NotFoundException('Observación no encontrada');
    return o;
  }

  async eliminar(id: number) {
    const o = await this.obtener(id);
    return this.obsRepo.remove(o);
  }
}

