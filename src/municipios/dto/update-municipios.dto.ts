import { PartialType } from '@nestjs/mapped-types';
import { CreateMunicipioDto } from './create-municipios.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateMunicipioDto extends PartialType(CreateMunicipioDto) {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  caso?: string;

  // 🔹 ID del gestor asignado (Usuario)
  @IsOptional()
  @IsNumber()
  gestorAsignadoId?: number;
}
