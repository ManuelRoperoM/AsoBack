import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class AgregarObservacionDto {
  @IsNotEmpty()
  @IsNumber()
  autorId: number;

  @IsNotEmpty()
  @IsString()
  contenido: string;

  @IsOptional()
  @IsNumber()
  estadoId?: number;
}

