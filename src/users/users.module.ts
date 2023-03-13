import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import User from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../core/middleware/auth.middleware';
import Transactions from 'src/transactions/entities/transactions.entity';
import Picture from 'src/picture/entities/picture.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Card } from 'src/card/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Transactions, Card, Picture,Wallet])],
  controllers: [UsersController],
  providers: [UsersService, AuthMiddleware, WalletService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users/update', method: RequestMethod.PATCH },
        { path: 'users/auth', method: RequestMethod.GET },
      );
  }
}
