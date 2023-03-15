import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from './create-wallet.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Status } from 'src/constants/contansts';


export class UpdateWalletDto extends PartialType(CreateWalletDto) {
    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsEnum(Status)
    status: Status

    @IsString()
    @IsNotEmpty()
    alias:string
}
