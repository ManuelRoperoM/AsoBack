import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { successResponse } from '../common/response/response.helper';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
  ) {}

  async crear(dto: CreateUsuarioDto) {
    const usuario = this.usuarioRepo.create(dto);
    return this.usuarioRepo.save(usuario);
  }

  async listar() {
    const data = await this.usuarioRepo.find();

    if (!data || data.length === 0) {
      return successResponse([], 'No hay registros disponibles', 204);
    }
    return successResponse(data, 'Consulta exitosa', 200);
  }

  async obtenerPorId(id: number) {
    const user = await this.usuarioRepo.findOne({ where: { id_usuario: id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async actualizar(id: number, dto: UpdateUsuarioDto) {
    const user = await this.obtenerPorId(id);
    Object.assign(user, dto);
    return this.usuarioRepo.save(user);
  }

  async eliminar(id: number) {
    const user = await this.obtenerPorId(id);
    return this.usuarioRepo.remove(user);
  }
}
