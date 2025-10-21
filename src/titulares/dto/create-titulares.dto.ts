import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTitularesDto {
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
