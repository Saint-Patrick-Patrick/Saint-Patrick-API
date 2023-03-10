import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import Transactions from './entities/Transactions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import User from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions]),TypeOrmModule.forFeature([User])],
  controllers: [TransactionsController],
  providers: [TransactionsService, AppService, AuthMiddleware],
})
export class TransactionsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'transactions/update', method: RequestMethod.PATCH });
  }
}
