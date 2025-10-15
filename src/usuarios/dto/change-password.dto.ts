import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  newPass: string;
}
