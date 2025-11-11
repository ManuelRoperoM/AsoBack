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

  @IsEnum(['CC', 'CE', 'PA', 'NIT'])
  tipoDocumento: string;

  @IsNumber()
  idTramite: number;
}
