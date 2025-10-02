import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TramiteEstado } from './entities/tramite-estado.entity';

@Injectable()
export class TramiteEstadosService {
  constructor(@InjectRepository(TramiteEstado) private estadoRepo: Repository<TramiteEstado>) {}

  async crear(dto: any) {
    const e = this.estadoRepo.create(dto);
    return this.estadoRepo.save(e);
  }

  async listar() {
    return this.estadoRepo.find();
  }

  async obtener(id: number) {
    const e = await this.estadoRepo.findOne({ where: { id_estado: id } });
    if (!e) throw new NotFoundException('Estado no encontrado');
    return e;
  }

  async eliminar(id: number) {
    const e = await this.obtener(id);
    return this.estadoRepo.remove(e);
  }
}

