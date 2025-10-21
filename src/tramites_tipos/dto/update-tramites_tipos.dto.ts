import { PartialType } from '@nestjs/mapped-types';
import { CreateTramitesTiposDto } from './create-tramites_tipos.dto';

export class UpdateTramitesTiposDto extends PartialType(CreateTramitesTiposDto) {}