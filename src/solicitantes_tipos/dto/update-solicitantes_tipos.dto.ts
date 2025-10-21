import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitantesTiposDto } from './create-solicitantes_tipos.dto';

export class UpdateSolicitantesTiposDto extends PartialType(
  CreateSolicitantesTiposDto,
) {}
