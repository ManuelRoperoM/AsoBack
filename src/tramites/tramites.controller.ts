import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { TramitesService } from './tramites.service';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { AsignarGestorDto } from './dto/asignar-gestor.dto';
import { CambiarEstadoDto } from './dto/cambiar-estado.dto';
import { AgregarObservacionDto } from './dto/agregar-observacion.dto';

@Controller('tramites')
export class TramitesController {
  constructor(private readonly tramitesService: TramitesService) {}

  @Post()
  crearTramite(@Body() dto: CreateTramiteDto) {
    return this.tramitesService.crear(dto);
  }

  @Get()
  listar() {
    return this.tramitesService.listar();
  }

  @Get(':id')
  obtener(@Param('id') id: number) {
    return this.tramitesService.obtenerPorId(+id);
  }

  @Put(':id/asignar-gestor')
  asignarGestor(@Param('id') id: number, @Body() dto: AsignarGestorDto) {
    return this.tramitesService.asignarGestor(+id, dto);
  }

  @Put(':id/cambiar-estado')
  cambiarEstado(@Param('id') id: number, @Body() dto: CambiarEstadoDto) {
    return this.tramitesService.cambiarEstado(+id, dto);
  }

  @Post(':id/observaciones')
  agregarObservacion(@Param('id') id: number, @Body() dto: AgregarObservacionDto) {
    return this.tramitesService.agregarObservacion(+id, dto);
  }
}

