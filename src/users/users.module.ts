import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import User from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../core/middleware/auth.middleware';
import Transactions from 'src/transactions/entities/transactions.entity';
import Notification from 'src/notifications/entities/notification.entity';
import Picture from 'src/picture/entities/picture.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { CardService } from 'src/card/card.service';
import SaintPatrickCard from 'src/saint-patrick-card/entities/saint-patrick-card.entity';
import { SaintPatrickCardService } from 'src/saint-patrick-card/saint-patrick-card.service';
import { Card } from 'src/card/entities/card.entity';
import { SaintPatrickCardModule } from 'src/saint-patrick-card/saint-patrick-card.module';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Transactions,
      Card,
      Picture,
      Wallet,
      Notification,
      SaintPatrickCard,
    ]),
    SaintPatrickCardModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthMiddleware,
    WalletService,
    CardService,
    SaintPatrickCardService,
    NotificationsService
  ],
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
