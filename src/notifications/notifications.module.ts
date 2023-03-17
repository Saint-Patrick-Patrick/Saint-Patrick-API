import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import Notification from './entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Notification,
    ]),
  ],
  providers: [NotificationsGateway, NotificationsService]
})
export class NotificationsModule {}
