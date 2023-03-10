import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import Transactions from './entities/transactions.entity';
import { plainToClass } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
// import Cards from '../Cards/entities/Cards.entity';
import User from '../users/entities/user.entity';
import { Module } from '@nestjs/common/decorators';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions) private TransactionsRepo: Repository<Transactions>,
    // @InjectRepository(Cards) private CardsRepo: Repository<Cards>,
    // @InjectRepository(User) private UserRepo: Repository<User>,
    private readonly configService: ConfigService
  )
  {}

  async create(CreateTransactionsDto: CreateTransactionsDto): Promise<Transactions> {
    //()=> Lo de abajo lo dejo comentado hasta que terminen de implementar lo otro
    // const existCBUShipment = await this.CardsRepo.findOne({
    //   where:{CBU:CreateTransactionsDto.fromCBU},
    //   relations: { user : true }
    // });
    // const existCVUOrAlias =  await this.UserRepo.findOne({
    //   where:[
    //     {CVU:CreateTransactionsDto.toCVUOrAlias},
    //     {alias:CreateTransactionsDto.toCVUOrAlias}
    //   ],
    // });
    // const existCBUReceipt = await this.CardsRepo.findOne({
    //   where:{CBU:CreateTransactionsDto.fromCBU}
    //   relations: { user : true }
    // });
    // if(!existCBUShipment|!existCVUOrAlias|!existCBUReceipt)
    //   throw new NotFoundException('ups Error Inesperado')
    // const newAmountUserOne:number = existCBUShipment.user.amount - CreateTransactionsDto.amount; 
    // const newAmountUserTwo:number = existCBUReceipt.user.amount + CreateTransactionsDto.amount; 
    // if(newAmountUserOne < 0)
    //   throw new BadRequestException('No tienes suficientes fondos para realizar esta transaccion');
    // Object.assign(existCBUShipment.user, {amount:newAmountUserOne});
    //Object.assign(existCBUShipment.user, {amount:newAmountUserTwo});
    const createdTransaction = await this.TransactionsRepo.create(CreateTransactionsDto);
    return this.TransactionsRepo.save(createdTransaction);
  }
  async find():Promise<Transactions[]>{
    return this.TransactionsRepo.find();
  }
}
