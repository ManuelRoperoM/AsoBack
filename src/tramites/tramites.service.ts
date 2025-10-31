import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Tramite } from './entities/tramites.entity';
import { Inmueble } from '../inmuebles/entities/inmuebles.entity';
import { CreateTramiteDto, DocumentoDto } from './dto/create-tramites.dto';
import { UpdateTramiteDto } from './dto/update-tramites.dto';
import { CreateInmuebleDto } from '../inmuebles/dto/create-inmuebles.dto';
import { TramitesRelacion } from 'src/tramites_relacion/entities/tramites_relacion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { InmueblesService } from 'src/inmuebles/inmuebles.service';
import { DocumentosService } from 'src/documentos/documentos.service';
import { TitularesService } from 'src/titulares/titulares.service';
import { CreateTitularesDto } from 'src/titulares/dto/create-titulares.dto';
import { CreateTrazabilidadDto } from 'src/trazabilidad/dto/create-trazabilidad.dto';
import { TrazabilidadService } from 'src/trazabilidad/trazabilidad.service';
import { SolicitantesTipos } from 'src/solicitantes_tipos/entities/solicitantes_tipos.entity';
import { Trazabilidad } from 'src/trazabilidad/entities/trazabilidad.entity';
import { successResponse } from '../common/response/response.helper';
@Injectable()
export class TramitesService {
  // trazabilidadRepo: any;
  constructor(
    @InjectRepository(Tramite)
    private readonly tramiteRepo: Repository<Tramite>,

    @InjectRepository(Inmueble)
    private readonly inmuebleRepo: Repository<Inmueble>,

    @InjectRepository(TramitesRelacion)
    private readonly tramitesRelacionRepo: Repository<TramitesRelacion>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,

    @InjectRepository(SolicitantesTipos)
    private readonly solicitanteTipo: Repository<SolicitantesTipos>,

    private readonly inmuebleService: InmueblesService,

    private readonly documentoService: DocumentosService,

    private readonly titularesService: TitularesService,

    private readonly trazabilidadService: TrazabilidadService,

    @InjectRepository(Trazabilidad)
    private readonly trazabilidadRepo: Repository<Trazabilidad>,
  ) {}

  async create(dto: CreateTramiteDto) {
    try {
      const tramiteRelacion = await this.tramitesRelacionRepo.findOne({
        where: { id: dto.tramiteRelacionId },
      });
      const solicitante = await this.usuarioRepo.findOne({
        where: { id_usuario: dto.solicitanteId },
      });
      const gestorAsignado = dto.gestorAsignadoId
        ? await this.usuarioRepo.findOne({
            where: { id_usuario: dto.gestorAsignadoId },
          })
        : null;

      const solicitanesTipo = await this.solicitanteTipo.findOne({
        where: { id: dto.solicitanteTipoId },
      });

      if (!tramiteRelacion)
        throw new NotFoundException('TramiteRelacion no encontrado');
      if (!solicitante)
        throw new NotFoundException('Solicitante no encontrado');
      if (!solicitanesTipo)
        throw new NotFoundException('Solicitante tipo no encontrado');

      // Crear la entidad
      const tramite = this.tramiteRepo.create({
        estado: dto.estado,
        razones: dto.razones,
        solicitanteTipo: solicitanesTipo,
        tramiteRelacion,
        solicitante,
        gestorAsignado,
      });

      // Crear inmuebles si existe en DTO
      if (dto.inmuebles && dto.inmuebles.length > 0) {
        const nuevos = await Promise.all(
          dto.inmuebles.map((data: CreateInmuebleDto) =>
            this.inmuebleService.create(data),
          ),
        );
        tramite.inmuebles = nuevos;
      }

      // Crea Documento
      if (dto.documentos && dto.documentos.length > 0) {
        const nuevos = await Promise.all(
          dto.documentos.map((data: DocumentoDto) =>
            this.documentoService.crear(data),
          ),
        );
        tramite.documentos = nuevos;
      }
      // Crea Titular
      if (dto.titulares && dto.titulares.length > 0) {
        console.log('Titulares:', dto.titulares);
        const nuevos = await Promise.all(
          dto.titulares.map((data: CreateTitularesDto) =>
            this.titularesService.create(data),
          ),
        );
        tramite.titulares = nuevos;
      } else {
        throw new NotFoundException(
          `No hay informacion de titular no encontrado`,
        );
      }
      // Trazabilidad
      if (dto.trazabilidades && dto.trazabilidades.length > 0) {
        const nuevos = await Promise.all(
          dto.trazabilidades.map((data: CreateTrazabilidadDto) =>
            this.trazabilidadService.create(data, solicitante, gestorAsignado),
          ),
        );
        tramite.trazabilidades = nuevos;
      }

      const newTramite = await this.tramiteRepo.save(tramite);

      // 🟩 Generar el código
      const fecha = new Date(newTramite.fechaCreacion);
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const año = fecha.getFullYear();
      const codigo = `RASOGC-${newTramite.id}-${dia}-${mes}-${año}`;

      // 🟩 Actualizar el campo codigoAso
      await this.tramiteRepo.update(newTramite.id, { codigoAso: codigo });

      //..............  NUEVO CODIGO CARPETA
      // 🟩 Crear carpeta física en /dataset/<codigo>
      const basePath = path.join(__dirname, '../../dataset', codigo);
      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
      }

      // .............. FIN CODUGO NUEVO CARPETAS

      return await this.tramiteRepo.findOne({
        where: { id: newTramite.id },
        relations: [
          'tramiteRelacion',
          'tramiteRelacion.tramiteTipo',
          'tramiteRelacion.solicitudTipo',
          'solicitante',
          'gestorAsignado',
          'solicitanteTipo',
          'titulares',
          'documentos',
          'trazabilidades',
          'inmuebles',
          'inmuebles.municipio',
        ],
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /*
  async findAll(any?: any, usuario?: any) {
    const data = await this.tramiteRepo.find({
      relations: [
        'tramiteRelacion',
        'tramiteRelacion.tramiteTipo',
        'tramiteRelacion.solicitudTipo',
        'solicitante',
        'gestorAsignado',
        'solicitanteTipo',
        'titulares',
        'documentos',
        'trazabilidades',
        'inmuebles',
        'inmuebles.municipio',
      ],
      order: {
        id: 'DESC', // 👈 Cambia "id_tramite" por el campo que identifica tu orden
      },
    });

    if (!data || data.length === 0) {
      return successResponse([], 'No hay registros disponibles', 204);
    }

    return successResponse(data, 'Consulta exitosa', 200);
  }

  */

  async findAll(usuarioActual: any) {
    try {
      const where: any = {};

      // 🔹 Si es ciudadano, solo ve sus propios trámites
      if (usuarioActual.rol === 'CIUDADANO') {
        where.solicitante = { id_usuario: usuarioActual.id_usuario };
      }

      // 🔹 Si es GESTOR o ADMIN, no se aplica filtro (ven todos)
      const data = await this.tramiteRepo.find({
        where,
        relations: [
          'tramiteRelacion',
          'tramiteRelacion.tramiteTipo',
          'tramiteRelacion.solicitudTipo',
          'solicitante',
          'gestorAsignado',
          'solicitanteTipo',
          'titulares',
          'documentos',
          'trazabilidades',
          'inmuebles',
          'inmuebles.municipio',
        ],
        order: {
          id: 'DESC',
        },
      });

      if (!data || data.length === 0) {
        return successResponse([], 'No hay registros disponibles', 204);
      }

      return successResponse(data, 'Consulta exitosa', 200);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    const data = await this.tramiteRepo.findOne({
      where: { id },
      relations: [
        'tramiteRelacion',
        'tramiteRelacion.tramiteTipo',
        'tramiteRelacion.solicitudTipo',
        'solicitante',
        'gestorAsignado',
        'solicitanteTipo',
        'titulares',
        'documentos',
        'trazabilidades',
        'inmuebles',
        'inmuebles.municipio',
      ],
    });

    if (!data) {
      return successResponse([], `Trámite con ID ${id} no encontrado`, 204);
    }

    return successResponse(data, 'Consulta exitosa', 200);
  }

  async update(id: number, dto: UpdateTramiteDto) {
    const tramite = await this.tramiteRepo.findOne({
      where: { id },
      relations: ['inmuebles'],
    });

    if (!tramite) {
      throw new NotFoundException(`Trámite con ID ${id} no encontrado`);
    }

    Object.assign(tramite, dto);

    if (dto.inmuebles && dto.inmuebles.length > 0) {
      const existentesIds = dto.inmuebles.filter((i) => i.id).map((i) => i.id);

      const nuevosDatos = dto.inmuebles.filter((i) => !i.id);

      const existentes = await this.inmuebleRepo.find({
        where: { id: In(existentesIds) },
      });

      // Actualizar existentes
      existentes.forEach((existente) => {
        const actualizado = dto.inmuebles.find((i) => i.id === existente.id);
        if (actualizado) {
          Object.assign(existente, {
            ...actualizado,
          });
        }
      });

      // Crear nuevos
      const nuevos = nuevosDatos.map((data: CreateInmuebleDto) =>
        this.inmuebleRepo.create({
          ...data,
        }),
      );

      tramite.inmuebles = [...existentes, ...nuevos];
    }

    return await this.tramiteRepo.save(tramite);
  }

  async remove(id: number) {
    const tramite = await this.tramiteRepo.findOne({ where: { id } });
    if (!tramite) {
      throw new NotFoundException(`Trámite con ID ${id} no encontrado`);
    }
    await this.tramiteRepo.remove(tramite);
    return { message: `Trámite con ID ${id} eliminado` };
  }

  // actualizar tramite
  // 🔹 Actualizar estado del trámite y generar trazabilidad
  async actualizarEstado(
    id: number,
    dto: {
      estado: string;
      gestorAsignadoId?: number;
      observacion?: string;
    },
    usuarioLogueado: any,
  ) {
    const tramite = await this.tramiteRepo.findOne({
      where: { id },
      relations: ['gestorAsignado'],
    });

    if (!tramite) {
      throw new NotFoundException('Trámite no encontrado');
    }

    // ✅ Actualizar el estado y el gestor asignado (si aplica)
    tramite.estado = dto.estado || tramite.estado;

    if (dto.gestorAsignadoId) {
      const nuevoGestor = await this.usuarioRepo.findOne({
        where: { id_usuario: dto.gestorAsignadoId },
      });
      if (!nuevoGestor) {
        throw new BadRequestException('Gestor asignado no válido');
      }
      tramite.gestorAsignado = nuevoGestor;
    }

    await this.tramiteRepo.save(tramite);

    // ✅ Crear registro de trazabilidad
    const trazabilidad = this.trazabilidadRepo.create({
      tramite,
      usuario: await this.usuarioRepo.findOne({
        where: { id_usuario: usuarioLogueado.id },
      }),
      gestor: tramite.gestorAsignado || null,
      estado: dto.estado,
      observacion: dto.observacion || '',
    });

    const trazabilidadGuardada = await this.trazabilidadRepo.save(trazabilidad);

    // ✅ Retornar respuesta con todos los datos
    return {
      mensaje: 'Estado actualizado y trazabilidad registrada correctamente.',
      tramite: {
        id: tramite.id,
        estado: tramite.estado,
        gestorAsignado: tramite.gestorAsignado
          ? {
              id: tramite.gestorAsignado.id_usuario,
              nombre: tramite.gestorAsignado.nombre,
              correo: tramite.gestorAsignado.correo,
            }
          : null,
      },
      trazabilidad: {
        id: trazabilidadGuardada.id,
        estado: trazabilidadGuardada.estado,
        observacion: trazabilidadGuardada.observacion,
        fecha: trazabilidadGuardada.fecha,
        usuario: {
          id: usuarioLogueado.id,
          nombre: usuarioLogueado.nombre,
          correo: usuarioLogueado.correo,
          rol: usuarioLogueado.rol,
        },
        gestor: tramite.gestorAsignado
          ? {
              id: tramite.gestorAsignado.id_usuario,
              nombre: tramite.gestorAsignado.nombre,
              correo: tramite.gestorAsignado.correo,
            }
          : null,
      },
    };
  }
  // 🔹 Consultar trazabilidad de un trámite
  async obtenerTrazabilidadPorTramite(id: number) {
    const tramite = await this.tramiteRepo.findOne({ where: { id } });
    if (!tramite) {
      throw new NotFoundException('Trámite no encontrado');
    }

    const trazabilidad = await this.trazabilidadRepo.find({
      where: { tramite: { id } },
      relations: ['usuario', 'gestor'],
      order: { fecha: 'DESC' },
    });

    return {
      tramiteId: id,
      totalRegistros: trazabilidad.length,
      historial: trazabilidad.map((t) => ({
        id: t.id,
        estado: t.estado,
        observacion: t.observacion,
        fecha: t.fecha,
        usuario: t.usuario
          ? {
              id: t.usuario.id_usuario,
              nombre: t.usuario.nombre,
              correo: t.usuario.correo,
            }
          : null,
        gestor: t.gestor
          ? {
              id: t.gestor.id_usuario,
              nombre: t.gestor.nombre,
              correo: t.gestor.correo,
            }
          : null,
      })),
    };
  }

  //
}
