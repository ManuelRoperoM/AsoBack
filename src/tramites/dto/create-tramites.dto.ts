import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
  IsEnum,
  IsInt,
  MaxLength,
  IsBase64,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateInmuebleDto } from '../../inmuebles/dto/create-inmuebles.dto';

// ========================================
// 🔸 DTO PRINCIPAL
// ========================================

export class CreateTramiteDto {
  @IsString()
  estado: string;

  @IsNumber()
  tramiteRelacionId: number;

  @IsNumber()
  solicitanteId: number;

  @IsNumber()
  @IsOptional()
  gestorAsignadoId?: number;

  @IsOptional()
  @IsString()
  razones?: string;

  @IsNumber()
  solicitanteTipoId: number;

  // 🔹 Relaciones anidadas opcionales
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInmuebleDto) // ✅ tipado correcto
  inmuebles?: CreateInmuebleDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TitularDto)
  titulares?: TitularDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentoDto)
  documentos?: DocumentoDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TrazabilidadDto)
  trazabilidades?: TrazabilidadDto[];
}

// ========================================
// 🔸 Sub-DTOs para las relaciones
// ========================================

export class TitularDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  numeroDocumento: string;

  @IsEnum(['CC', 'TI', 'PA', 'NIT', 'RC'])
  tipoDocumento: string;
}

export class DocumentoDto {
  @IsOptional()
  @IsNumber()
  id_documento?: number;

  @IsString()
  nombre_archivo: string;

  @IsString()
  ruta: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipo?: string;

  @IsOptional()
  @IsBase64()
  contenido?: string;
}

export class TrazabilidadDto {
  @IsInt()
  @IsOptional()
  id_tramite?: number;

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
