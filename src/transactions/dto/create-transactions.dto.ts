import { IsNotEmpty, Length, IsDate, IsNumber, IsString  } from 'class-validator';

export class CreateTransactionsDto {

  @IsString()
  @IsNotEmpty()
  fromCBU: string;

  @IsString()
  @IsNotEmpty()
  for: string;

  @IsString()
  toCVU: string;
  
  @IsString()
  toAlias: string;

  @IsNumber()
  toCardCBU:number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsDate()
  @Length(8,8)
  date: string;

  @IsNotEmpty()
  @IsString()
  @Length(8,8)
  hour: string;

}


