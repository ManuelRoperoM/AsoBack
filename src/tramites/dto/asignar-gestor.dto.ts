import { IsNotEmpty, IsNumber } from 'class-validator';

export class AsignarGestorDto {
  @IsNotEmpty()
  @IsNumber()
  gestorId: number;
}

