import { IsOptional, IsString } from 'class-validator';

export class CreateTramitesTiposDto {
  @IsOptional()
  @IsString()
  nombre?: string;
}
