import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ObservacionesService } from './observaciones.service';

@Controller('observaciones')
export class ObservacionesController {
  constructor(private readonly obsService: ObservacionesService) {}

  @Post()
  crear(@Body() dto: any) {
    return this.obsService.crear(dto);
  }

  @Get()
  listar() {
    return this.obsService.listar();
  }

  @Get(':id')
  obtener(@Param('id') id: number) {
    return this.obsService.obtener(+id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.obsService.eliminar(+id);
  }
}

