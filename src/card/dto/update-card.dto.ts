import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsNumber, IsString , Matches } from 'class-validator';
import { Status } from 'src/core/constants/contansts';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {

  @IsNotEmpty()
  @IsEnum(Status)
  status?: Status;

  @IsNotEmpty()
  @IsString()
  expirationDate?: string;

  @IsNotEmpty()
  @IsNumber()
  amount?: number;
}
