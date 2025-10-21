// src/inmuebles/dto/create-inmuebles.dto.ts
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateInmuebleDto {
  @IsString()
  tipo: 'URBANO' | 'RURAL';

  @IsInt()
  municipio_id: number;

  @IsOptional()
  @IsString()
  ficha?: string;

  @IsOptional()
  @IsString()
  matricula?: string;

  @IsOptional()
  @IsInt()
  id?: number; // para actualizar inmuebles existentes
}
