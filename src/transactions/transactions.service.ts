import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { plainToClass } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import Transactions from './entities/transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepo: Repository<Transactions>,
  ) {}
  private readonly configService: ConfigService;

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
}
