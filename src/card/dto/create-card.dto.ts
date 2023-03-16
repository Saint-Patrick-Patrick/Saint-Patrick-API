import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';
import { Status } from 'src/constants/contansts';
export class CreateCardDto {
  
  @IsNotEmpty()
  @IsNumber()
  card_number?: number;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsNotEmpty()
  @IsNumber()
  @Length(3)
  cardVerificationCode?: number;

  @IsNotEmpty()
  @IsString()
  ID:string;

  @IsNotEmpty()
  @IsString()
  expirationDate?: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z0-9]{4}$/)
  securityPin?: string; // <- Cambio de string a string porque el parametro va a recibir una string

  @IsNotEmpty()
  @IsNumber()
  amount:number;

}

