import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import SaintPatrickCard from 'src/saint-patrick-card/entities/saint-patrick-card.entity';
import { Wallet } from './entities/wallet.entity';
import { Card } from 'src/cards/entities/card.entity';
import { CardsService } from '../cards/cards.service';
import { UsersService } from 'src/users/users.service';
import { SaintPatrickCardService } from 'src/saint-patrick-card/saint-patrick-card.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, SaintPatrickCard, Wallet, Card])],
  controllers: [WalletController],
  providers: [WalletService, CardsService, UsersService, SaintPatrickCardService]
})
export class WalletModule {}
