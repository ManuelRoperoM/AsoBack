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

  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum([
    'ADMIN',
    'GESTOR',
    'USER',
    'COORDINADOR',
    'FUNCIONARIO',
    'SUPERVISOR',
    'ATENCION',
  ])
  rol?: string; // ADMIN | GESTOR | CIUDADANO
}
