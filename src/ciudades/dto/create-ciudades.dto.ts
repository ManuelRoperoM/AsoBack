import { IsOptional, IsString } from 'class-validator';

export class CreateCiudadesDto {
    @IsOptional()
    @IsString()
    nombre?: string;
}