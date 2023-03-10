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
        entities:[Transactions,User],
        synchronize:true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Transactions]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TransactionsModule,
    UsersModule,
    AuthModule,
    WalletModule,
    PictureModule
    // aca van todos los modulos
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

