import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Transaction } from './entities/transaction.entity';
import User from 'src/user/entities/user.entity';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Card } from 'src/card/entities/card.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionReposirory: Repository<Transaction>,
    @InjectRepository(Wallet)
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Wallet)
    private walletsRepo: Repository<Wallet>,
    @InjectRepository(Card)
    private cardsRepo: Repository<Card>,
  ) {}

  async findAll(): Promise<Transaction[]>{
     return await this.transactionReposirory.find({
      relations:{user:true}
    });
  };
  async findOne(id:number):Promise<Transaction | undefined>{
    const transaction = await this.transactionReposirory.findOne({
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

  async getToInfo(
    cvu: string,
    alias: string,
    cbu: string,
  ): Promise<{
    cvu: string;
    cbu: string;
    alias: string;
    toWallet: Wallet;
    toUser: User;
    toType: string;
  }> {
    let toType: string;
    let toUser: User;
    let toWallet: Wallet | null = null;

    const wallet = await this.walletsRepo.findOne({
      where: [{ cvu }, { alias }],
      relations: ['user'],
    });

    const card = await this.cardsRepo.findOne({
      where: { cbu },
      relations: ['user'],
    });
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

    return {
      cvu: wallet?.cvu || null,
      alias: wallet?.alias || null,
      cbu: card?.cbu || null,
      toWallet,
      toUser,
      toType,
    };
  }

  async getFromInfo(userId: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('Usuario no autorizado');
    }
    return user;
  }

  async createTransaction(
    userTo: any,
    user: any,
    amount: number,
  ): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.to = user.id;
    transaction.from = userTo.id;
    transaction.amount = amount;

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;
    transaction.date = formattedDate;
    transaction.fromType = userTo.fromType;
    return this.transactionReposirory.save(transaction);
  }
}
