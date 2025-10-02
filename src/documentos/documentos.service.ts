import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from './entities/documento.entity';

@Injectable()
export class DocumentosService {
  constructor(@InjectRepository(Documento) private docRepo: Repository<Documento>) {}

  async crear(dto: any) {
    const doc = this.docRepo.create(dto);
    return this.docRepo.save(doc);
  }

  async listar() {
    return this.docRepo.find({ relations: ['tramite', 'usuario'] });
  }

  async obtener(id: number) {
    const d = await this.docRepo.findOne({ where: { id_documento: id } , relations: ['tramite','usuario']});
    if (!d) throw new NotFoundException('Documento no encontrado');
    return d;
  }

  async eliminar(id: number) {
    const d = await this.obtener(id);
    return this.docRepo.remove(d);
  }
}

