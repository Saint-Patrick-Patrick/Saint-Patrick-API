import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import User from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './middleware/auth.middleware';
import Transactions from 'src/transactions/entities/transactions.entity';
import { Card } from 'src/cards/entities/card.entity';
import Picture from 'src/picture/entities/picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Transactions, Card, Picture])],
  controllers: [UsersController],
  providers: [UsersService, AuthMiddleware],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'users/update', method: RequestMethod.PATCH });
  }
}
