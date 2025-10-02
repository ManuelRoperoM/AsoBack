import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  crear(@Body() dto: any) {
    return this.rolesService.crear(dto);
  }

  @Get()
  listar() {
    return this.rolesService.listar();
  }

  @Get(':id')
  obtener(@Param('id') id: number) {
    return this.rolesService.obtener(+id);
  }

  @Put(':id')
  actualizar(@Param('id') id: number, @Body() dto: any) {
    return this.rolesService.actualizar(+id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.rolesService.eliminar(+id);
  }
}

