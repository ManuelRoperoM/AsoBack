// src/inmuebles/dto/update-inmuebles.dto.ts
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateInmuebleDto } from './create-inmuebles.dto';

export class UpdateInmuebleDto extends PartialType(
  OmitType(CreateInmuebleDto, ['id'] as const),
) {}
