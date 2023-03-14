import { Module } from '@nestjs/common';
import { SaintPatrickCardService } from './saint-patrick-card.service';
import { SaintPatrickCardController } from './saint-patrick-card.controller';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import SaintPatrickCard from './entities/saint-patrick-card.entity';
import { CardsService } from 'src/cards/cards.service';
import { WalletService } from 'src/wallet/wallet.service';
import { Card } from 'src/cards/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, SaintPatrickCard, Card])],
  controllers: [SaintPatrickCardController],
  providers: [SaintPatrickCardService, CardsService]
})
export class SaintPatrickCardModule {}
