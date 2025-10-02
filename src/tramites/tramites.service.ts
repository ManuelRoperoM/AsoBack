import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tramite } from './entities/tramite.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Historial } from './entities/historial.entity';
import { Observacion } from './entities/observacion.entity';
import { TramiteEstado } from '../tramite-estados/entities/tramite-estado.entity';
import { Ciudad } from '../ciudades/entities/ciudad.entity';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { AsignarGestorDto } from './dto/asignar-gestor.dto';
import { CambiarEstadoDto } from './dto/cambiar-estado.dto';
import { AgregarObservacionDto } from './dto/agregar-observacion.dto';

@Injectable()
export class TramitesService {
  constructor(
    @InjectRepository(Tramite) private tramiteRepo: Repository<Tramite>,
    @InjectRepository(Usuario) private userRepo: Repository<Usuario>,
    @InjectRepository(Historial) private historialRepo: Repository<Historial>,
    @InjectRepository(Observacion) private obsRepo: Repository<Observacion>,
    @InjectRepository(TramiteEstado) private estadoRepo: Repository<TramiteEstado>,
    @InjectRepository(Ciudad) private ciudadRepo: Repository<Ciudad>,
  ) {}

  async crear(dto: CreateTramiteDto) {
    const solicitante = await this.userRepo.findOne({ where: { id_usuario: dto.solicitanteId } });
    if (!solicitante) throw new NotFoundException('Solicitante no encontrado');

    const ciudad = dto.ciudadId ? await this.ciudadRepo.findOne({ where: { id_ciudad: dto.ciudadId } }) : null;
    const estadoInicial = await this.estadoRepo.findOne({ where: { nombre: 'RADICADO' } });

    const tramite = this.tramiteRepo.create({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      solicitante,
      ciudad: ciudad || null,
      notaria: dto.notaria || null,
      estado: estadoInicial ? estadoInicial.nombre : 'RADICADO',
      estadoEntity: estadoInicial || null,
    });

    await this.tramiteRepo.save(tramite);

    await this.historialRepo.save({
      tramite,
      usuario: solicitante,
      accion: 'CREAR',
      detalle: `Trámite creado por ${solicitante.nombre}`,
    });

    return tramite;
  }

  async listar() {
    return this.tramiteRepo.find({ relations: ['solicitante', 'gestorAsignado', 'ciudad', 'observaciones', 'historial', 'estadoEntity'] });
  }

  async obtenerPorId(id: number) {
    const tramite = await this.tramiteRepo.findOne({ where: { id_tramite: id }, relations: ['solicitante', 'gestorAsignado', 'ciudad', 'observaciones', 'historial', 'estadoEntity'] });
    if (!tramite) throw new NotFoundException('Trámite no encontrado');
    return tramite;
  }

  async asignarGestor(id: number, dto: AsignarGestorDto) {
    const tramite = await this.obtenerPorId(id);
    const gestor = await this.userRepo.findOne({ where: { id_usuario: dto.gestorId } });
    if (!gestor) throw new NotFoundException('Gestor no encontrado');

    tramite.gestorAsignado = gestor;
    await this.tramiteRepo.save(tramite);

    await this.historialRepo.save({
      tramite,
      usuario: gestor,
      accion: 'ASIGNAR_GESTOR',
      detalle: `Gestor asignado: ${gestor.nombre}`,
    });

    return tramite;
  }

  async cambiarEstado(id: number, dto: CambiarEstadoDto) {
    const tramite = await this.obtenerPorId(id);
    const usuario = await this.userRepo.findOne({ where: { id_usuario: dto.usuarioId } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const nuevoEstado = dto.nuevoEstado;
    const estadoEntity = await this.estadoRepo.findOne({ where: { nombre: nuevoEstado } });
    tramite.estado = nuevoEstado;
    if (estadoEntity) tramite.estadoEntity = estadoEntity;

    await this.tramiteRepo.save(tramite);

    await this.historialRepo.save({
      tramite,
      usuario,
      accion: 'CAMBIAR_ESTADO',
      detalle: `Estado cambiado a ${nuevoEstado} por ${usuario.nombre}`,
    });

    return tramite;
  }

  async agregarObservacion(id: number, dto: AgregarObservacionDto) {
    const tramite = await this.obtenerPorId(id);
    const autor = await this.userRepo.findOne({ where: { id_usuario: dto.autorId } });
    if (!autor) throw new NotFoundException('Usuario no encontrado');

    const estadoEntity = dto.estadoId ? await this.estadoRepo.findOne({ where: { id_estado: dto.estadoId } }) : null;

    const obs = this.obsRepo.create({
      tramite,
      autor,
      contenido: dto.contenido,
      estado: estadoEntity || null,
    });

    await this.obsRepo.save(obs);

    await this.historialRepo.save({
      tramite,
      usuario: autor,
      accion: 'OBSERVACION',
      detalle: `Observación agregada por ${autor.nombre}`,
    });

    return obs;
  }
}

