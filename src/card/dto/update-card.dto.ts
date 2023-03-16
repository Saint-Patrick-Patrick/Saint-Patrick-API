import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsNumber, IsString , Matches } from 'class-validator';
import { Status } from 'src/constants/contansts';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {

  @IsNotEmpty()
  @IsEnum(Status)
  status?: Status;

  @IsNotEmpty()
  @IsString()
  expirationDate?: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z0-9]{4}$/)
  securityPin?: string;

  @IsNotEmpty()
  @IsNumber()
  amount?: number;
}
