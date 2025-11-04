import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTrazabilidadDto {
  @IsInt()
  @IsOptional()
  id_tramite?: number;

  @IsOptional()
  @IsEnum([
    'RADICADO',
    'ASIGNADO',
    'RECHAZADO',
    'REVISIÓN',
    'DEVUELTO',
    'FINALIZADO',
  ])
  estado: string;

  @IsOptional()
  @IsString()
  observacion?: string;
}
