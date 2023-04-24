import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';
import { Status } from 'src/core/constants/contansts';
export class CreateCardDto {
  
  @IsNotEmpty()
  @IsNumber()
  cardNumber?: string;

  @IsNotEmpty()
  @IsString()
  cardHolderName: string

  @IsNotEmpty()
  @IsString()
  cbu:string

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
  @IsNumber()
  amount:number;

}

