import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '../core/middleware/auth.middleware';
import User from './entities/user.entity';
import { UserService } from './user.service';
import { WalletService } from 'src/wallet/wallet.service';
import { CardService } from 'src/card/card.service';
import { SaintPatrickCardService } from 'src/saint-patrick-card/saint-patrick-card.service';
import { Card } from 'src/card/entities/card.entity';
import Notification from 'src/notification/entities/notification.entity';
import Picture from 'src/picture/entities/picture.entity';
import  Wallet from 'src/wallet/entities/wallet.entity';
import SaintPatrickCard from 'src/saint-patrick-card/entities/saint-patrick-card.entity';
import { UserController } from './user.controller';
import { SaintPatrickCardModule } from 'src/saint-patrick-card/saint-patrick-card.module';
import Transaction from 'src/transaction/entities/transaction.entity';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Transaction,
      Card,
      Picture,
      Wallet,
      Notification,
      SaintPatrickCard,
    ]),
    SaintPatrickCardModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthMiddleware,
    WalletService,
    CardService,
    SaintPatrickCardService,
    NotificationService
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users/update', method: RequestMethod.PATCH },
        { path: 'users/auth', method: RequestMethod.GET },
      );
  }
}
