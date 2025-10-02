import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';

@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Post()
  crear(@Body() dto: any) {
    return this.municipiosService.crear(dto);
  }

  @Get()
  listar() {
    return this.municipiosService.listar();
  }

  @Get(':id')
  obtener(@Param('id') id: number) {
    return this.municipiosService.obtener(+id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.municipiosService.eliminar(+id);
  }
}

