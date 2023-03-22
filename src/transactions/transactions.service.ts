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


  /// diagrama
  createTransactions(createTransactionsDto): void{
  }

  findAll(): Promise<Transactions[]>{
    return this.transactionsRepo.find({
      relations:{user:true}
    });
  };
  findOne(id:number):Promise<Transactions>{
    return this.transactionsRepo.findOneBy({id})
  }
//  private readonly seLaBanca(){
//   return
//  }
}
