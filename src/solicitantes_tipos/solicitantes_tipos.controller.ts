import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SolicitantesTiposService } from './solicitantes_tipos.service';
import { CreateSolicitantesTiposDto } from './dto/create-solicitantes_tipos.dto';
import { UpdateSolicitantesTiposDto } from './dto/update-solicitantes_tipos.dto';
import { errorResponse } from '../common/response/response.helper';

@Controller('solicitantes_tipos')
export class SolicitantesTiposController {
  constructor(private readonly service: SolicitantesTiposService) {}

  @Post()
  create(@Body() dto: CreateSolicitantesTiposDto) {
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
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateSolicitantesTiposDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
