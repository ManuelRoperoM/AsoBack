import { Tramite } from '../entities/tramites.entity';
import { TramiteCache } from 'src/cache/interfaces/tramite.cache.interface';
// import { TramiteCache } from '../../cache/interfaces/tramite.cache.interface';

export function mapTramiteToCache(tramite: Tramite): TramiteCache {
  return {
    id: tramite.id,
    estado: tramite.estado,
    razones: tramite.razones ?? '',
    fecha_creacion: tramite.fechaCreacion.toISOString(),
    fecha_actualizacion: tramite.fechaActualizacion.toISOString(),
    tramiteRelacionId: tramite.tramiteRelacion.id,
    solicitanteIdUsuario: tramite.solicitante.id_usuario,
    gestorAsignadoIdUsuario: tramite.gestorAsignado?.id_usuario ?? null,
    gestorAuxiliarIdUsuario: tramite.gestorAuxiliar?.id_usuario ?? null,
    solicitanteTipoId: tramite.solicitanteTipo?.id ?? null,
    codigo_aso: tramite.codigoAso,
  };
}
