import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Rol) private rolRepo: Repository<Rol>) {}

  async crear(dto: any) {
    const rol = this.rolRepo.create(dto);
    return this.rolRepo.save(rol);
  }

  async listar() {
    return this.rolRepo.find();
  }

  async obtener(id: number) {
    const r = await this.rolRepo.findOne({ where: { id_rol: id } });
    if (!r) throw new NotFoundException('Rol no encontrado');
    return r;
  }

  async actualizar(id: number, dto: any) {
    const r = await this.obtener(id);
    Object.assign(r, dto);
    return this.rolRepo.save(r);
  }

  async eliminar(id: number) {
    const r = await this.obtener(id);
    return this.rolRepo.remove(r);
  }
}

