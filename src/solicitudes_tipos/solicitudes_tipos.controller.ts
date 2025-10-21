import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SolicitudesTiposService } from './solicitudes_tipos.service';
import { CreateSolicitudesTiposDto } from './dto/create-solicitudes_tipos.dto';
import { UpdateSolicitudesTiposDto } from './dto/update-solicitudes_tipos.dto';

@Controller('solicitudes_tipo')
export class SolicitudesTiposController {
  constructor(private readonly service: SolicitudesTiposService) {}

  @Post()
  create(@Body() dto: CreateSolicitudesTiposDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateSolicitudesTiposDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
