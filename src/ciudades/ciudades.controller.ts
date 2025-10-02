import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CiudadesService } from './ciudades.service';

@Controller('ciudades')
export class CiudadesController {
  constructor(private readonly ciudadesService: CiudadesService) {}

  @Post()
  crear(@Body() dto: any) {
    return this.ciudadesService.crear(dto);
  }

  @Get()
  listar() {
    return this.ciudadesService.listar();
  }

  @Get(':id')
  obtener(@Param('id') id: number) {
    return this.ciudadesService.obtener(+id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.ciudadesService.eliminar(+id);
  }
}

