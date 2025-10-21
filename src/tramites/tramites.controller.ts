import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { TramitesService } from './tramites.service';
import { CreateTramiteDto } from './dto/create-tramites.dto';

import { errorResponse } from '../common/response/response.helper';

@Controller('tramites')
export class TramitesController {
  constructor(private readonly tramitesService: TramitesService) {}

  @Post()
  create(@Body() dto: CreateTramiteDto) {
    return this.tramitesService.create(dto);
  }

  // @Post()
  // create(@Req() req, @Body() dto: any) {
  //   console.log('RAW BODY:', req.body);
  //   console.log('DTO:', dto);
  // }

  @Get()
  async findAll() {
    try {
      return await this.tramitesService.findAll();
    } catch (error) {
      return errorResponse(
        'Error al obtener los registros',
        500,
        error.message,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tramitesService.findOne(+id);
  }
  //................
  /**
   * ✅ Actualiza el estado de un trámite y registra la trazabilidad
   */
  @Put(':id/estado')
  async actualizarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      estado: string;
      gestorAsignadoId?: number;
      observacion?: string;
      usuarioLogueado: {
        id: number;
        nombre: string;
        correo: string;
        rol: string;
      };
    },
  ) {
    return this.tramitesService.actualizarEstado(
      id,
      {
        estado: body.estado,
        gestorAsignadoId: body.gestorAsignadoId,
        observacion: body.observacion,
      },
      body.usuarioLogueado, // 👈 Usuario simulado (por ahora)
    );
  }

  @Get(':id/trazabilidad')
  async obtenerHistorial(@Param('id') id: number) {
    return this.tramitesService.obtenerTrazabilidadPorTramite(id);
  }
  //.................
}
