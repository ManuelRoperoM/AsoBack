import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TramitesTiposService } from './tramites_tipos.service';
import { CreateTramitesTiposDto } from './dto/create-tramites_tipos.dto';
import { UpdateTramitesTiposDto } from './dto/update-tramites_tipos.dto';

@Controller('tramites_tipos')
export class TramitesTiposController {
  constructor(private readonly service: TramitesTiposService) {}

  @Post()
  create(@Body() dto: CreateTramitesTiposDto) {
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
  update(@Param('id') id: number, @Body() dto: UpdateTramitesTiposDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
