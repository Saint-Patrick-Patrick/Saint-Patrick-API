import { Module } from '@nestjs/common';
import { SaintPatrickCardService } from './saint-patrick-card.service';
import { SaintPatrickCardController } from './saint-patrick-card.controller';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import SaintPatrickCard from './entities/saint-patrick-card.entity';
import { CardService } from 'src/card/card.service';
import { WalletService } from 'src/wallet/wallet.service';
import { Card } from 'src/card/entities/card.entity';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, SaintPatrickCard, Card, User])],
  controllers: [SaintPatrickCardController],
  providers: [SaintPatrickCardService, CardService, WalletService, UsersService]
})
export class SaintPatrickCardModule {}
