import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  HttpException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { successResponse } from '../common/response/response.helper';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { resetPasswordTemplate } from '../templates/email';
import { createUserTemplate } from '../templates/createUser';

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

  async crear({ nombre, correo, password }: CreateUsuarioDto) {
    try {
      const existUser = await this.usuarioRepo.findOne({ where: { correo } });

      if (existUser)
        throw new ConflictException(
          `Ya existe un usuario con el correo ${correo}`,
        );

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const usuario = this.usuarioRepo.create({
        nombre,
        correo,
        password: hashedPassword,
        rol: 'CIUDADANO',
      });
      const {
        nombre: createdUser,
        correo: createdCorreo,
        rol: createdRol,
      } = await this.usuarioRepo.save(usuario);
      return { nombre: createdUser, correo: createdCorreo, rol: createdRol };
    } catch (error) {
      throw error;
    }
  }

  async crearDesdeAdmin(adminUser: any, dto: any) {
    try {
      if (adminUser.rol !== 'ADMIN') {
        throw new ForbiddenException('No tienes permisos para crear usuarios');
      }

      const { nombre, correo, rol } = dto;

      const existUser = await this.usuarioRepo.findOne({ where: { correo } });
      if (existUser) {
        throw new ConflictException(
          `Ya existe un usuario con el correo ${correo}`,
        );
      }

      const nuevaClave = randomBytes(4).toString('hex');
      const hashedPassword = await bcrypt.hash(nuevaClave, 10);

      const usuario = this.usuarioRepo.create({
        nombre,
        correo,
        password: hashedPassword,
        rol: rol || 'CIUDADANO',
      });

      const savedUser = await this.usuarioRepo.save(usuario);

      const html = createUserTemplate
        .replace('{{nombre}}', savedUser.nombre)
        .replace('{{correo}}', savedUser.correo)
        .replace('{{nueva_contrasena}}', nuevaClave)
        .replace('{{año}}', new Date().getFullYear().toString())
        .replace('{{sitio}}', 'https://asomunicipios.com');

      await this.sendMail(
        savedUser.correo,
        'Tu cuenta ha sido creada - Asomunicipios',
        html,
      );

      return {
        message: 'Usuario creado y correo enviado correctamente',
        usuario: {
          id: savedUser.id_usuario,
          nombre: savedUser.nombre,
          correo: savedUser.correo,
          rol: savedUser.rol,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async listar() {
    const data = await this.usuarioRepo.find();

    if (!data || data.length === 0) {
      return successResponse([], 'No hay registros disponibles', 204);
    }
    return successResponse(data, 'Consulta exitosa', 200);
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

  async cambiarUserPassword(id_user: number, newPass: string) {
    try {
      const userUpdate = await this.obtenerPorId(id_user);

      if (!userUpdate) throw new NotFoundException('Usuario no encontrado');

      if (!newPass || newPass.trim() === '') {
        throw new BadRequestException(
          'La nueva contraseña no puede estar vacía',
        );
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPass, saltRounds);

      userUpdate.password = hashedPassword;
      await this.usuarioRepo.save(userUpdate);

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
