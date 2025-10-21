import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TitularesService } from './titulares.service';
import { CreateTitularesDto } from './dto/create-titulares.dto';
import { UpdateTitularesDto } from './dto/update-titulares.dto';

@Controller('titulares')
export class TitularesController {
  constructor(private readonly service: TitularesService) {}

  @Post()
  create(@Body() dto: CreateTitularesDto) {
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
  update(@Param('id') id: number, @Body() dto: UpdateTitularesDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
