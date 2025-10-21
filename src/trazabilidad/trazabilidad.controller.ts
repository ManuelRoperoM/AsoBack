import { Controller, Get, Body, Param, Patch, Delete } from '@nestjs/common';
import { TrazabilidadService } from './trazabilidad.service';
// import { CreateTrazabilidadDto } from './dto/create-trazabilidad.dto';
import { UpdateTrazabilidadDto } from './dto/update-trazabilidad.dto';
import { errorResponse } from '../common/response/response.helper';

@Controller('trazabilidad')
export class TrazabilidadController {
  constructor(private readonly service: TrazabilidadService) {}

  // @Post()
  // create(@Body() dto: CreateTrazabilidadDto) {
  //   return this.service.create(dto);
  // }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('tramite/:id')
  async findByTramite(@Param('id') id: number) {
    try {
      return await this.service.findByTramite(id);
    } catch (error) {
      return errorResponse(
        'Error al obtener los registros',
        500,
        error.message,
      );
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateTrazabilidadDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
