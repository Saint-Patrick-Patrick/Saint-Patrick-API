import { IsEnum, IsNumber, IsNotEmpty, Matches } from 'class-validator';
import { Status } from 'src/core/constants/contansts';

export class CreateSaintPatrickCardDto {
  @IsNumber()
  walletId: number;
  
  @IsNotEmpty()
  @IsNumber()
  cardNumber?: number;

  @IsNotEmpty()
  @IsEnum(Status)
  status?: Status;

  @IsNotEmpty()
  @IsNumber()
  @Matches(/^[0-9]{4}$/)
  securityPin?: string; // <- Cambio de string a number
}
