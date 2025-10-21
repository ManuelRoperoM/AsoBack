// src/inmuebles/dto/update-inmuebles.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateInmuebleDto } from './create-inmuebles.dto';

export class UpdateInmuebleDto extends PartialType(CreateInmuebleDto) {
  id: number; // obligatorio para identificar el inmueble
}
