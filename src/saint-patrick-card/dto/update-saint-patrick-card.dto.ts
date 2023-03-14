import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { CreateSaintPatrickCardDto } from './create-saint-patrick-card.dto';

export class UpdateSaintPatrickCardDto extends PartialType(CreateSaintPatrickCardDto) {

    @IsNotEmpty()
    wallet:Wallet
}
