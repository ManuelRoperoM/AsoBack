import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trazabilidad } from './entities/trazabilidad.entity';
import { CreateTrazabilidadDto } from './dto/create-trazabilidad.dto';
import { UpdateTrazabilidadDto } from './dto/update-trazabilidad.dto';
import { Tramite } from '../tramites/entities/tramites.entity'; // ✅ ruta corregida
import { Usuario } from '../usuarios/entities/usuario.entity';
import { ApiResponse, successResponse } from '../common/response/response.helper';

@Injectable()
export class TrazabilidadService {
  constructor(
    @InjectRepository(Trazabilidad)
    private readonly repo: Repository<Trazabilidad>,

    @InjectRepository(Tramite)
    private readonly tramiteRepo: Repository<Tramite>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  // 🔹 Crear un registro de trazabilidad
  async create(
    dto: CreateTrazabilidadDto,
    usuario,
    gestor,
  ): Promise<Trazabilidad> {
    const nuevo = this.repo.create({
      usuario,
      gestor,
      estado: dto.estado,
      observacion: dto.observacion,
    });

    return this.repo.save(nuevo);
  }

  // 🔹 Obtener todas las trazabilidades
  async findAll(): Promise<Trazabilidad[]> {
    return this.repo.find({
      order: { fecha: 'DESC' },
    });
  }

  // 🔹 Obtener trazabilidad por trámite
  async findByTramiteBK(id_tramite: number): Promise<Trazabilidad[]> {
    return this.repo.find({
      where: { tramite: { id: id_tramite } },
      order: { fecha: 'DESC' },
    });
  }

  //..................
  async findByTramite(
    id_tramite: number,
  ): Promise<ApiResponse<Trazabilidad[]>> {
    const data = await this.repo.find({
      where: { tramite: { id: id_tramite } },
      order: { id: 'DESC' },
    });

    if (!data || data.length === 0) {
      return successResponse([], 'No hay registros disponibles', 204);
    }

    return successResponse(data, 'Consulta exitosa', 200);
  }
  //................

  // 🔹 Actualizar trazabilidad existente
  async update(id: number, dto: UpdateTrazabilidadDto): Promise<Trazabilidad> {
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id } });
  }

  // 🔹 Eliminar registro de trazabilidad
  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
