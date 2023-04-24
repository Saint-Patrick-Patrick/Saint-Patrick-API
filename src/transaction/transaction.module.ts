import User from 'src/user/entities/user.entity';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import Transaction from './entities/transaction.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Card } from 'src/card/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User, Wallet,Card ])],
  controllers: [TransactionController],
  providers: [TransactionService, AppService, AuthMiddleware],
})
export class TransactionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)

      .forRoutes(
        { path: 'transaction/update', method: RequestMethod.PATCH },
        { path: 'transaction/create', method: RequestMethod.POST },
      );
  }
}
