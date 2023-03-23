import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Transactions } from './entities/transactions.entity';
import User from 'src/users/entities/user.entity';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Card } from 'src/card/entities/card.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepo: Repository<Transactions>,
    @InjectRepository(Wallet)
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Wallet)
    private walletsRepo: Repository<Wallet>,
    @InjectRepository(Card)
    private cardsRepo: Repository<Card>,
  ) {}

  //Falta esto
  async validateAmount(amount: number): Promise<boolean> {
    return amount > 0;
  }

  async getToInfo(cvu: string, alias: string, cbu: string): Promise<{ cvu: string; cbu: string; alias: string; toWallet: Wallet; toUser: User }> {
    const wallet = await this.walletsRepo.findOne({
      where: [{ cvu }, { alias }],
      relations: ['user']
    });

    const card = await this.cardsRepo.findOne({ where: { cbu }, relations: ['user'] });
    if (!wallet && !card) {
      throw new NotFoundException('Destinatario no encontrado');
    }

    if(wallet){
      return { cvu: wallet.cvu, alias: wallet.alias, cbu: null, toWallet: wallet, toUser: wallet.user };
    }
    
    return { cvu:null, cbu: card.cbu, alias: null, toWallet: null, toUser: card.users[0] };
  }


  async getFromInfo(userId: number): Promise<User> {
  
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('Usuario no autorizado');
    }
    return user;
  }

  async createTransaction(data: Object): Promise<Transactions> {
    // Aquí debes implementar la lógica para crear la transacción.
    // Por ejemplo:
    const transaction = new Transactions();
    transaction.to = data.to;
    transaction.toUser = data.toUser;
    transaction.toType = data.toType;
    transaction.fromUser = data.fromUser;
    transaction.amount = data.amount;
    return this.transactionsRepo.save(transaction);
  }
}
