import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import User from './users/entities/user.entity';
import Transactions from './transactions/entities/transactions.entity';
import { AuthModule } from './core/auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { PictureModule } from './picture/picture.module';
import { CardsModule } from './cards/cards.module';
import { SaintPatrickCardModule } from './saint-patrick-card/saint-patrick-card.module';
import Picture from './picture/entities/picture.entity';
import { Wallet } from './wallet/entities/wallet.entity';
import { Card } from './cards/entities/card.entity';
import SaintPatrickCard from './saint-patrick-card/entities/saint-patrick-card.entity';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PGHOST'),
        port: configService.get('PGPORT'),
        username: configService.get<string>('PGUSERNAME'),
        password: configService.get<string>('PGPASSWORD'),
        database: configService.get<string>('PGDATABASE'),
        entities:[Transactions,User, Picture, Wallet, Card,SaintPatrickCard],
        synchronize:true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Transactions, Picture, Wallet, Card,SaintPatrickCard]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TransactionsModule,
    UsersModule,
    AuthModule,
    WalletModule,
    PictureModule,
    CardsModule,
    SaintPatrickCardModule
    // aca van todos los modulos
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

