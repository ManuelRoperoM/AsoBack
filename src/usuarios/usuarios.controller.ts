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
import {
  successResponse,
  errorResponse,
} from '../common/response/response.helper';
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
  async listar() {
    try {
      return await this.usuariosService.listar();
    } catch (error) {
      return errorResponse(
        'Error al obtener los registros',
        500,
        error.message,
      );
    }
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
}
