import { PartialType } from '@nestjs/mapped-types';
import { CreateTramiteDto } from './create-tramites.dto';

export class UpdateTramiteDto extends PartialType(CreateTramiteDto) {}
