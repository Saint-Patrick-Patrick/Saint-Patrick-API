import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './utils/strategy/google.strategy';
import { FacebookStrategy } from './utils/strategy/facebook.strategy';
import { UserService } from 'src/user/user.service';
import User from 'src/user/entities/user.entity';
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
    UserService,
    ConfigService,
    WalletService,
    CardService,
    SaintPatrickCardService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
