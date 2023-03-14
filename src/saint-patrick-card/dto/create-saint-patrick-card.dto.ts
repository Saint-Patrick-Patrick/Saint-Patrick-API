import { IsDateString, IsEnum, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches } from 'class-validator';
import { Status } from '../entities/saint-patrick-card.entity';

export class CreateSaintPatrickCardDto {
  @IsNumber()
  walletId: number;
  
  @IsOptional()
  @IsNumber()
  card_number?: number;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsNumber()
  @Length(3)
  pin?: number; // <- Cambio de string a number

  @IsOptional()
  @IsDateString()
  expiration_date?: Date;

  @IsOptional()
  @IsNumber()
  @Matches(/^[0-9]{4}$/)
  pinPassword?: number; // <- Cambio de string a number
}
