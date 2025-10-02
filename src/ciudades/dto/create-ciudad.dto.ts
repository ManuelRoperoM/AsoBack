import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCiudadDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNumber()
  id_municipio: number;
}

