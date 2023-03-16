import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Card } from './entities/card.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import SaintPatrickCard from 'src/saint-patrick-card/entities/saint-patrick-card.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/core/auth/auth.service';
import { SaintPatrickCardService } from 'src/saint-patrick-card/saint-patrick-card.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Card, Wallet, SaintPatrickCard])],
  controllers: [CardController],
  providers: [CardService, WalletService, UsersService, AuthService, SaintPatrickCardService]
})
export class CardModule{}