import { IsOptional, IsString } from 'class-validator';

export class CreateSolicitudesTiposDto {
  @IsOptional()
  @IsString()
  nombre?: string;
}
