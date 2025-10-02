import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTramiteDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  solicitanteId: number;

  @IsOptional()
  @IsNumber()
  ciudadId?: number;

  @IsOptional()
  @IsString()
  notaria?: string;
}

