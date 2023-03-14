import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { UsersService } from 'src/users/users.service';
import User from 'src/users/entities/user.entity';
import { AuthService } from 'src/core/auth/auth.service';
import { SaintPatrickCardService } from 'src/saint-patrick-card/saint-patrick-card.service';
import SaintPatrickCard from 'src/saint-patrick-card/entities/saint-patrick-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Wallet, User, SaintPatrickCard])],
  controllers: [CardsController],
  providers: [CardsService, WalletService, UsersService, AuthService, SaintPatrickCardService]
})
export class CardsModule {}
