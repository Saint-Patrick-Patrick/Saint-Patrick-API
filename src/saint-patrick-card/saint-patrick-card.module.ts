import { Module } from '@nestjs/common';
import { SaintPatrickCardService } from './saint-patrick-card.service';
import { SaintPatrickCardController } from './saint-patrick-card.controller';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import SaintPatrickCard from './entities/saint-patrick-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, SaintPatrickCard])],
  controllers: [SaintPatrickCardController],
  providers: [SaintPatrickCardService]
})
export class SaintPatrickCardModule {}
