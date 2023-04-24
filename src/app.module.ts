import { Module,forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import User from './user/entities/user.entity';
import Transaction from './transaction/entities/transaction.entity';
import { AuthModule } from './core/auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { PictureModule } from './picture/picture.module';
import { SaintPatrickCardModule } from './saint-patrick-card/saint-patrick-card.module';
import Picture from './picture/entities/picture.entity';
import { Wallet } from './wallet/entities/wallet.entity';
import { Card } from './card/entities/card.entity';
import { CardModule } from './card/card.module';
import { SaintPatrickCard } from './saint-patrick-card/entities/saint-patrick-card.entity';
import { NotificationModule } from './notification/notification.module';
import Notification from './notification/entities/notification.entity';

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
        entities:[Transaction,User, Picture, Wallet, Card,SaintPatrickCard, Notification],
        synchronize:true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Transaction, Picture, Wallet, Card,SaintPatrickCard, Notification]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TransactionModule,
    UserModule,
    AuthModule,
    WalletModule,
    PictureModule,
    CardModule,
    SaintPatrickCardModule,
    NotificationModule,
    // aca van todos los modulos
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

