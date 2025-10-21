import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudesTiposDto } from './create-solicitudes_tipos.dto';

export class UpdateSolicitudesTiposDto extends PartialType(
  CreateSolicitudesTiposDto,
) {}
