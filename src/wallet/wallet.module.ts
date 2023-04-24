import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/user/entities/user.entity';
import SaintPatrickCard from 'src/saint-patrick-card/entities/saint-patrick-card.entity';
import { Wallet } from './entities/wallet.entity';
import { Card } from 'src/card/entities/card.entity';
import { CardService } from 'src/card/card.service';
import { UserService } from 'src/user/user.service';
import { SaintPatrickCardService } from 'src/saint-patrick-card/saint-patrick-card.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, SaintPatrickCard, Wallet, Card])],
  controllers: [WalletController],
  providers: [WalletService, CardService, UserService, SaintPatrickCardService]
})
export class WalletModule {}
