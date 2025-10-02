import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { TramiteEstadosService } from './tramite-estados.service';

@Controller('tramite-estados')
export class TramiteEstadosController {
  constructor(private readonly estadosService: TramiteEstadosService) {}

  @Post()
  crear(@Body() dto: any) {
    return this.estadosService.crear(dto);
  }

  @Get()
  listar() {
    return this.estadosService.listar();
  }

  @Get(':id')
  obtener(@Param('id') id: number) {
    return this.estadosService.obtener(+id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.estadosService.eliminar(+id);
  }
}

