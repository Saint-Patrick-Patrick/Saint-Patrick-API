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

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User,Wallet]), ConfigModule],
  providers: [
    AuthService,
    GoogleStrategy,
    FacebookStrategy,
    UsersService,
    ConfigService,
    WalletService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
