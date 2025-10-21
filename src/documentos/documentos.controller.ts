import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { DocumentosService } from './documentos.service';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post()
  crear(@Body() dto: any) {
    return this.documentosService.crear(dto);
  }

  @Get()
  listar() {
    return this.documentosService.listar();
  }

  @Get(':id')
  obtener(@Param('id') id: number) {
    return this.documentosService.obtener(+id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.documentosService.eliminar(+id);
  }
}

