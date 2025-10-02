import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crear(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.crear(dto);
  }

  @Get()
  listar() {
    return this.usuariosService.listar();
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

