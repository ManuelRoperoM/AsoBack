import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTrazabilidadDto {
  @IsInt()
  @IsOptional()
  id_tramite?: number;

  @IsOptional()
  @IsEnum([
    'ASIGNADO',
    'RADICADO',
    'EN PROCESO',
    'FINALIZADO',
    'ANULADO',
    'VERIFICAR',
    'SI RECHAZO',
    'GENERADO',
    'EN EJECUCION',
  ])
  estado: string;

  @IsOptional()
  @IsString()
  observacion?: string;
}
