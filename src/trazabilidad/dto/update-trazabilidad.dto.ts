import { PartialType } from '@nestjs/mapped-types';
import { CreateTrazabilidadDto } from './create-trazabilidad.dto';

export class UpdateTrazabilidadDto extends PartialType(CreateTrazabilidadDto) {}
