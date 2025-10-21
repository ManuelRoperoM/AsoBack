import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Titular } from './entities/titulares.entity';
import { CreateTitularesDto } from './dto/create-titulares.dto';
import { UpdateTitularesDto } from './dto/update-titulares.dto';

@Injectable()
export class TitularesService {
  constructor(
    @InjectRepository(Titular)
    private readonly titularRepository: Repository<Titular>,
  ) {}

  async create(dto: CreateTitularesDto): Promise<Titular> {
    const titular = this.titularRepository.create({ ...dto });
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
