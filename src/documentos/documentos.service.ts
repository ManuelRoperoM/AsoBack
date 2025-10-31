import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from './entities/documento.entity';
import { DocumentoDto } from 'src/tramites/dto/create-tramites.dto';
@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento) private docRepo: Repository<Documento>,
  ) {}

  async crear(dto: DocumentoDto) {
    const doc = this.docRepo.create({
      ...dto,
    });
    return this.docRepo.save(doc);
  }

  async listar() {
    return this.docRepo.find({ relations: ['tramite'] });
  }

  // Obtener documentos por tramite ID
  async obtener(id: number) {
    const d = await this.docRepo.findOne({
      where: { tramite: { id } },
      relations: ['tramite'],
    });
    if (!d) throw new NotFoundException('Documento no encontrado');
    return d;
  }

  /*   async insertar(dto: DocumentoDto, idTramite: number) {
    const newDoc = await this.docRepo.create({
      ...dto,
      tramite: { id: idTramite },
    });

    return await this.docRepo.save(newDoc);
  } */

  async insertar(dtos: DocumentoDto | DocumentoDto[], idTramite: number) {
    // Aseguramos que siempre sea un array
    const documentosArray = Array.isArray(dtos) ? dtos : [dtos];

    // Creamos los documentos con la relación al trámite
    const documentos = documentosArray.map((dto) =>
      this.docRepo.create({
        ...dto,
        tramite: { id: idTramite },
      }),
    );

    // Guardamos todos los documentos en la base de datos
    return await this.docRepo.save(documentos);
  }

  async eliminar(id: number) {
    const d = await this.obtener(id);
    return this.docRepo.remove(d);
  }
}
