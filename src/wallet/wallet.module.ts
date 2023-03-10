import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import SaintPatrickCard from 'src/saint-patrick-card/entities/saint-patrick-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,SaintPatrickCard])],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
