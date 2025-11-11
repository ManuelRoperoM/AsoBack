import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTitularesDto } from './create-titulares.dto';

export class UpdateTitularesDto extends PartialType(
  OmitType(CreateTitularesDto, ['id', 'idTramite'] as const),
) {}
