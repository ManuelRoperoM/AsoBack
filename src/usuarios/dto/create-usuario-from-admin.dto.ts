import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { RolUsuario } from '../enums/rol.enum';

export class CreateUsuarioFromAdminDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsOptional()
  @IsEnum(RolUsuario, {
    message: `El rol debe ser uno de los siguientes valores: ${Object.values(RolUsuario).join(', ')}`,
  })
  rol?: string;
}
