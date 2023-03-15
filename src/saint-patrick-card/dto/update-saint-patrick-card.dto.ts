import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';
import { Status } from '../entities/saint-patrick-card.entity';

export class UpdateSaintPatrickCardDto {
  @IsOptional()
  @IsNumber()
  card_number?: number;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsNumber()
  pin?: number;

  @IsOptional()
  @IsDateString()
  expiration_date?: Date;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{4}$/)
  pinPassword?: number;
}
