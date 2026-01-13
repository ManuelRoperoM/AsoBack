// import { Tramite } from '../entities/tramites.entity';
import { TramiteCache } from 'src/cache/interfaces/tramite.cache.interface';
// import { TramiteCache } from '../../cache/interfaces/tramite.cache.interface';

export function mapTramiteToCache(tramite: any): TramiteCache {
  return {
    id: tramite.id,
    estado: tramite.estado,
    razones: tramite.razones ?? '',
    fecha_creacion: tramite.fechaCreacion.toISOString(),
    fecha_actualizacion: tramite.fechaActualizacion.toISOString(),

    tramiteRelacionId: tramite.tramiteRelacionId ?? null,
    solicitanteIdUsuario: tramite.solicitanteIdUsuario ?? null,
    gestorAsignadoIdUsuario: tramite.gestorAsignadoIdUsuario ?? null,
    gestorAuxiliarIdUsuario: tramite.gestorAuxiliarIdUsuario ?? null,
    solicitanteTipoId: tramite.solicitanteTipoId ?? null,

    codigo_aso: tramite.codigoAso,
  };
  /*
  return {
    id: tramite.id,
    estado: tramite.estado,
    razones: tramite.razones ?? '',
    fecha_creacion: tramite.fechaCreacion.toISOString(),
    fecha_actualizacion: tramite.fechaActualizacion.toISOString(),
    tramiteRelacionId: tramite.tramiteRelacion?.id ?? null,
    solicitanteIdUsuario: tramite.solicitante?.id_usuario ?? null,
    gestorAsignadoIdUsuario: tramite.gestorAsignado?.id_usuario ?? null,
    gestorAuxiliarIdUsuario: tramite.gestorAuxiliar?.id_usuario ?? null,
    solicitanteTipoId: tramite.solicitanteTipo?.id ?? null,
    codigo_aso: tramite.codigoAso,
  };
  */
}
