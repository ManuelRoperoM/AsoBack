import { PartialType } from '@nestjs/mapped-types';
import { CreateTramitesRelacionDto } from './create-tramites_relacion.dto';

export class UpdateTramitesRelacionDto extends PartialType(CreateTramitesRelacionDto) {}
