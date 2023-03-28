import User from 'src/users/entities/user.entity';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import Transactions from './entities/transactions.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Card } from 'src/card/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions, User, Wallet,Card ])],
  controllers: [TransactionsController],
  providers: [TransactionsService, AppService, AuthMiddleware],
})
export class TransactionsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)

      .forRoutes(
        { path: 'transactions/update', method: RequestMethod.PATCH },
        { path: 'transactions/create', method: RequestMethod.POST },
      );
  }
}
