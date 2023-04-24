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
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Wallet)
    private walletsRepo: Repository<Wallet>,
    @InjectRepository(Card)
    private cardsRepo: Repository<Card>,
  ) {}

  async findAll(): Promise<Transactions[]>{
     return await this.transactionsRepo.find({
      relations:{user:true}
    });
  };
  async findOne(id:number):Promise<Transactions | undefined>{
    const transaction = await this.transactionsRepo.findOne({
      relations:{user:true},
      where:{id}
    });
    if(transaction)
      throw new NotFoundException('Transfer not found')
    return transaction;
  }

  async validateAmount(amount: number, userId: number): Promise<boolean> {
    const amountUser = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.wallet', 'wallet')
      .leftJoinAndSelect('wallet.userWallet', 'userWallet')
      .select('SUM(userWallet.amount)', 'amount')
      .where('user.id = :userId', { userId })
      .getRawOne();
    
    return amount <= amountUser.amount;
  }
  

  async getToInfo(cvu: string, alias: string, cbu: string): Promise<{ cvu: string; cbu: string; alias: string; toWallet: Wallet; toUser: User, toType: string }> {
    let toType: string;
    let toUser: User;
    let toWallet: Wallet | null = null;
  
    const wallet = await this.walletsRepo.findOne({
      where: [{ cvu }, { alias }],
      relations: ['user']
    });
  
    const card = await this.cardsRepo.findOne({ where: { cbu }, relations: ['user'] });
    if (!wallet && !card) {
      throw new NotFoundException('Destinatario no encontrado');
    }
  
    if (wallet) {
      toType = 'alias' in wallet ? 'alias' : 'cvu';
      toUser = wallet.user;
      toWallet = wallet;
    } else {
      toType = 'cbu';
      toUser = card.user;
    }
  
    return { cvu: wallet?.cvu || null, alias: wallet?.alias || null, cbu: card?.cbu || null, toWallet, toUser, toType };
  }
  

  async getFromInfo(userId: number): Promise<User> {
  
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('Usuario no autorizado');
    }
    return user;
  }

  async createTransaction(userTo: any ,user:any, amount: number): Promise<Transactions> {
  const transaction = new Transactions();
  transaction.to = user.id;
  transaction.from = userTo.id;
  transaction.amount = amount;

 
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  transaction.date = formattedDate;
  transaction.fromType = userTo.fromType;
  return this.transactionsRepo.save(transaction);
}

}
