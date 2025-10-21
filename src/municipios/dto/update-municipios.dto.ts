import { PartialType } from '@nestjs/mapped-types';
import { CreateMunicipiosDto } from './create-municipios.dto';

export class UpdateMunicipiosDto extends PartialType(CreateMunicipiosDto) {}