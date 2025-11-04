import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipios } from './entities/municipios.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CreateMunicipioDto } from './dto/create-municipios.dto';
import { UpdateMunicipioDto } from './dto/update-municipios.dto';
import { successResponse } from '../common/response/response.helper';

@Injectable()
export class MunicipiosService {
  constructor(
    @InjectRepository(Municipios)
    private readonly municipiosRepository: Repository<Municipios>, // ✅ nombre consistente

    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>, // ✅ ok
  ) {}

  async create(dto: CreateMunicipioDto) {
    const nuevo = this.municipiosRepository.create(dto);
    const data = await this.municipiosRepository.save(nuevo);
    return successResponse(data, 'Municipio creado exitosamente', 201);
  }

  async findAll() {
    const data = await this.municipiosRepository.find();
    if (!data || data.length === 0) {
      return successResponse([], 'No hay registros disponibles', 204);
    }
    return successResponse(data, 'Consulta exitosa', 200);
  }

  async findOne(id: number) {
    const municipio = await this.municipiosRepository.findOne({
      where: { id },
    });
    if (!municipio) throw new NotFoundException('Municipio no encontrado');
    return successResponse(municipio, 'Consulta exitosa', 200);
  }

  /* async update(id: number, updateDto: UpdateMunicipioDto) {
    const municipio = await this.municipiosRepository.findOne({
      where: { id },
    });
    if (!municipio) throw new NotFoundException('Municipio no encontrado');

    // 🔹 Si viene el gestorAsignadoId, buscamos el usuario
    if (updateDto.gestorAsignadoId) {
      const usuario = await this.usuariosRepository.findOne({
        where: { id_usuario: updateDto.gestorAsignadoId },
      });
      if (!usuario) throw new NotFoundException('Usuario no encontrado');
      municipio.gestorAsignado = usuario;
    }

    // 🔹 Actualizamos los demás campos
    Object.assign(municipio, updateDto);

    const data = await this.municipiosRepository.save(municipio);
    return successResponse(data, 'Municipio actualizado correctamente', 200);
  } */

  async update(id: number, updateDto: UpdateMunicipioDto) {
    const municipio = await this.municipiosRepository.findOne({
      where: { id },
      relations: ['gestorAsignado'],
    });

    if (!municipio) throw new NotFoundException('Municipio no encontrado');

    // 🔹 Si viene gestorAsignadoId explícitamente
    if (updateDto.hasOwnProperty('gestorAsignadoId')) {
      if (updateDto.gestorAsignadoId === null) {
        // 👉 Si el valor es null, se desasigna el gestor
        municipio.gestorAsignado = null;
      } else {
        // 👉 Buscar y asignar el nuevo gestor
        const usuario = await this.usuariosRepository.findOne({
          where: { id_usuario: updateDto.gestorAsignadoId },
        });
        if (!usuario) throw new NotFoundException('Usuario no encontrado');
        municipio.gestorAsignado = usuario;
      }
    }

    // 🔹 Actualizar los demás campos (nombre, caso, etc.)
    Object.assign(municipio, updateDto);

    const data = await this.municipiosRepository.save(municipio);
    return successResponse(data, 'Municipio actualizado correctamente', 200);
  }

  async remove(id: number) {
    await this.municipiosRepository.delete(id);
    return successResponse({}, 'Municipio eliminado', 200);
  }
}
