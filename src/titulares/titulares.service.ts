import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Titular } from './entities/titulares.entity';
import { CreateTitularesDto } from './dto/create-titulares.dto';
import { UpdateTitularesDto } from './dto/update-titulares.dto';
import { Tramite } from 'src/tramites/entities/tramites.entity';

@Injectable()
export class TitularesService {
  constructor(
    @InjectRepository(Titular)
    private readonly titularRepository: Repository<Titular>,

    @InjectRepository(Tramite)
    private readonly tramiteRepository: Repository<Tramite>,
  ) {}

  async create(dto: CreateTitularesDto): Promise<Titular> {
    const titular = this.titularRepository.create({ ...dto });
    return this.titularRepository.save(titular);
  }

  async createByTramite(
    idTramite: number,
    dto: CreateTitularesDto,
  ): Promise<Titular> {
    const tramite = await this.tramiteRepository.findOne({
      where: { id: idTramite },
    });
    console.log('idTramite: ', idTramite);

    console.log('Tramite: ', tramite);

    if (!tramite) {
      throw new NotFoundException(`No existe tramite con id : ${idTramite}`);
    }

    const titular = this.titularRepository.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      numeroDocumento: dto.numeroDocumento,
      tipoDocumento: dto.tipoDocumento,
      tramite: tramite,
    });
    return this.titularRepository.save(titular);
  }

  async findAll(): Promise<Titular[]> {
    return this.titularRepository.find({ relations: ['tramite'] });
  }

  async findOne(id: number): Promise<Titular> {
    const titular = await this.titularRepository.findOne({
      where: { id },
      relations: ['tramite'],
    });
    if (!titular)
      throw new NotFoundException(`Titular con ID ${id} no encontrado`);
    return titular;
  }

  async update(id: number, dto: UpdateTitularesDto): Promise<Titular> {
    await this.titularRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.titularRepository.delete(id);
  }
}
