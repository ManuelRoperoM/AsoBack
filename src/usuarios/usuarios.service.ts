import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { resetPasswordTemplate } from '../templates/email';

@Injectable()
export class UsuariosService {
  private transporter;

  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async crear(dto: CreateUsuarioDto) {
    const usuario = this.usuarioRepo.create(dto);
    return this.usuarioRepo.save(usuario);
  }

  async listar() {
    return this.usuarioRepo.find();
  }

  async obtenerPorId(id: number) {
    const user = await this.usuarioRepo.findOne({ where: { id_usuario: id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async actualizar(id: number, dto: UpdateUsuarioDto) {
    const user = await this.obtenerPorId(id);
    Object.assign(user, dto);
    return this.usuarioRepo.save(user);
  }

  async eliminar(id: number) {
    const user = await this.obtenerPorId(id);
    return this.usuarioRepo.remove(user);
  }

  async userPorCorreo(email: string) {
    const user = await this.usuarioRepo.findOne({ where: { correo: email } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async cambiarUserPassword(id: number, newPass: string) {
    try {
      const user = await this.obtenerPorId(id);

      if (!newPass || newPass.trim() === '') {
        throw new BadRequestException(
          'La nueva contraseña no puede estar vacía',
        );
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPass, saltRounds);

      user.password = hashedPassword;
      await this.usuarioRepo.save(user);

      return {
        message: 'Contraseña actualizada correctamente',
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateNewPass(correo: string) {
    try {
      const user = await this.usuarioRepo.findOne({ where: { correo } });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado con ese correo');
      }

      const nuevaClave = randomBytes(4).toString('hex');

      const hashedPassword = await bcrypt.hash(nuevaClave, 10);

      user.password = hashedPassword;
      await this.usuarioRepo.save(user);

      const html = resetPasswordTemplate
        .replace('{{nombre}}', user.nombre)
        .replace('{{nueva_contrasena}}', nuevaClave)
        .replace('{{año}}', new Date().getFullYear().toString())
        .replace('{{sitio}}', 'https://asomunicipios.com');

      await this.sendMail(user.correo, 'Restablecimiento de contraseña', html);
      return { message: 'Correo de recuperación enviado correctamente' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async sendMail(to: string, subject: string, html: string) {
    try {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        html,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
