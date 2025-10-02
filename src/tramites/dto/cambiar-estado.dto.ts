import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CambiarEstadoDto {
  @IsNotEmpty()
  @IsString()
  nuevoEstado: string;

  @IsNumber()
  usuarioId: number;
}

