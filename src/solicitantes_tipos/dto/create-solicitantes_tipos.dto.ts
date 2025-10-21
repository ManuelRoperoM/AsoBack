import { IsOptional, IsString } from 'class-validator';

export class CreateSolicitantesTiposDto {
  @IsOptional()
  @IsString()
  nombre?: string;
}
