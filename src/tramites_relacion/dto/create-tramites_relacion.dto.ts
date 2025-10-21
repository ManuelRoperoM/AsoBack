import { IsInt } from 'class-validator';

export class CreateTramitesRelacionDto {
  @IsInt()
  tramites_tipos_id: number;

  @IsInt()
  solicitudes_tipos_id: number;
}
