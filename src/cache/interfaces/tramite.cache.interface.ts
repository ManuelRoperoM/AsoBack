export interface TramiteCache {
  id: number;
  estado: string;
  razones: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  tramiteRelacionId: number | null;
  solicitanteIdUsuario: number | null;
  gestorAsignadoIdUsuario: number | null;
  solicitanteTipoId: number | null;
  codigo_aso: string;
  gestorAuxiliarIdUsuario: number | null;
}
