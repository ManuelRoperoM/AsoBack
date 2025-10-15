import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  crear(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.crear(dto);
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
  changePassword(@Body() dto: ChangePasswordDto) {
    return this.usuariosService.cambiarUserPassword(dto.id, dto.newPass);
  }

  @Post('reset-password')
  async resetPassword(@Body('correo') correo: string) {
    return this.usuariosService.updateNewPass(correo);
  }
}
