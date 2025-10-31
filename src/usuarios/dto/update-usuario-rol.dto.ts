import { IsEnum } from 'class-validator';
import { RolUsuario } from '../enums/rol.enum';

export class UpdateUsuarioRolDto {
  @IsEnum(RolUsuario, {
    message: `El rol debe ser uno de los siguientes valores: ${Object.values(RolUsuario).join(', ')}`,
  })
  rol: string;
}
