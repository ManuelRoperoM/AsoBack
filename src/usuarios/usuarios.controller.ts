import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUsuarioFromAdminDto } from './dto/create-usuario-from-admin.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('create-user')
  crear(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.crear(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-from-admin')
  async createFromAdmin(@Req() req, @Body() dto: CreateUsuarioFromAdminDto) {
    const adminUser = req.user;
    return this.usuariosService.crearDesdeAdmin(adminUser, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  listar() {
    return this.usuariosService.listar();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.usuariosService.obtenerPorId(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  actualizar(@Param('id') id: number, @Body() dto: UpdateUsuarioDto) {
    return this.usuariosService.actualizar(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.usuariosService.eliminar(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('edit-password')
  changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    const id_user = req.user.id_usuario;
    return this.usuariosService.cambiarUserPassword(id_user, dto.newPass);
  }

  @Post('reset-password')
  async resetPassword(@Body('correo') correo: string) {
    return this.usuariosService.updateNewPass(correo);
  }
}
