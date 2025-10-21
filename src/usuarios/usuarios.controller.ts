import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import {
  successResponse,
  errorResponse,
} from '../common/response/response.helper';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crear(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.crear(dto);
  }

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

  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.usuariosService.obtenerPorId(+id);
  }

  @Put(':id')
  actualizar(@Param('id') id: number, @Body() dto: UpdateUsuarioDto) {
    return this.usuariosService.actualizar(+id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.usuariosService.eliminar(+id);
  }
}
