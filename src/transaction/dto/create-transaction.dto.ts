import { IsNotEmpty, Length, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @Length(8,8)
  date: string;

  @IsNotEmpty()
  @IsString()
  @Length(8,8)
  hour: string;

  @IsString()
  cbu: string;

  @IsString()
  cvu: string;

  @IsString()
  alias: string;
}
