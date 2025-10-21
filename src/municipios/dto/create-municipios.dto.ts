import { IsOptional, IsString } from 'class-validator';

export class CreateMunicipiosDto {
    @IsOptional()
    @IsString()
    nombre?: string;
}