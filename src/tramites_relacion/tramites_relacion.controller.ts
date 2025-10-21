import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TramitesRelacionService } from './tramites_relacion.service';
import { CreateTramitesRelacionDto } from './dto/create-tramites_relacion.dto';
import { UpdateTramitesRelacionDto } from './dto/update-tramites_relacion.dto';

import { errorResponse } from '../common/response/response.helper';

@Controller('tramites_relacion')
export class TramitesRelacionController {
  constructor(private readonly service: TramitesRelacionService) {}

  @Post()
  create(@Body() dto: CreateTramitesRelacionDto) {
    return this.service.create(dto);
  }

  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      return errorResponse(
        'Error al obtener los registros',
        500,
        error.message,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.service.findOne(+id);
    } catch (error) {
      return errorResponse(
        'Error al obtener los registros',
        500,
        error.message,
      );
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateTramitesRelacionDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
