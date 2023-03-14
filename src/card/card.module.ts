import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Card } from './entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Card])],
  controllers: [CardController],
  providers: [CardService]
})
export class CardModule{}