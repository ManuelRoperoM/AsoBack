import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.userPorCorreo(email);
    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      id_user: user.id_usuario,
      username: user.nombre,
      email: user.correo,
      rol: user.rol,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
