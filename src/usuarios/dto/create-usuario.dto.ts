import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  numeroDocumento: string;

  @IsEnum(['CC', 'CE', 'PA', 'NIT'])
  tipoDocumento: string;

  @IsString()
  telefono: string;

  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
