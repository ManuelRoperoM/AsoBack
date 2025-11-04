import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMunicipioDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  caso?: string;

  @IsOptional()
  @IsNumber()
  gestorAsignadoId?: number;
}
