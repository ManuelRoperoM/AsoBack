import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MunicipiosService } from './municipios.service';
import { CreateMunicipioDto } from './dto/create-municipios.dto';
import { UpdateMunicipioDto } from './dto/update-municipios.dto';
import { errorResponse } from '../common/response/response.helper';

@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly service: MunicipiosService) {}

  @Post()
  create(@Body() dto: CreateMunicipioDto) {
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
  update(@Param('id') id: number, @Body() dto: UpdateMunicipioDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
