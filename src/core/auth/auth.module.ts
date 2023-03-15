import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../strategy/google.strategy';
import { FacebookStrategy } from '../strategy/facebook.strategy';
import { UsersService } from 'src/users/users.service';
import User from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WalletService } from 'src/wallet/wallet.service';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { CardService } from 'src/card/card.service';
import { Card } from 'src/card/entities/card.entity';
import { SaintPatrickCardService } from 'src/saint-patrick-card/saint-patrick-card.service';
import SaintPatrickCard from 'src/saint-patrick-card/entities/saint-patrick-card.entity';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User,Wallet,Card, SaintPatrickCard]), ConfigModule],
  providers: [
    AuthService,
    GoogleStrategy,
    FacebookStrategy,
    UsersService,
    ConfigService,
    WalletService,
    CardService,
    SaintPatrickCardService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
