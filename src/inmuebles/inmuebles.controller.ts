import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { InmueblesService } from './inmuebles.service';
import { CreateInmuebleDto } from './dto/create-inmuebles.dto';
import { UpdateInmuebleDto } from './dto/update-inmuebles.dto';

@Controller('inmuebles')
export class InmueblesController {
  constructor(private readonly inmueblesService: InmueblesService) {}

  @Post()
  create(@Body() dto: CreateInmuebleDto) {
    return this.inmueblesService.create(dto);
  }

  @Post(':id')
  createByTramite(@Param('id') id: number, @Body() dto: CreateInmuebleDto) {
    return this.inmueblesService.createByTramite(id, dto);
  }

  @Get()
  findAll() {
    return this.inmueblesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.inmueblesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateInmuebleDto) {
    return this.inmueblesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.inmueblesService.remove(id);
  }
}
