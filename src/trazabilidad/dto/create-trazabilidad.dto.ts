import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTrazabilidadDto {
  @IsInt()
  @IsOptional()
  id_tramite?: number;

  @IsOptional()
  @IsEnum(['RADICADO', 'EN PROCESO', 'FINALIZADO', 'ANULADO', 'VERIFICAR'])
  estado: string;

  @IsOptional()
  @IsString()
  observacion?: string;
}
