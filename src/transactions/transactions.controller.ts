import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { AuthMiddleware } from './middleware/auth.middleware';
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly TransactionsService: TransactionsService,
  ) {}

  // @Post('/create')
  // async register(@Body() CreateTransactionsDto: CreateTransactionsDto) {
  //   return this.TransactionsService.create(CreateTransactionsDto);
  // }

  @Get('/all')
  findAll(){
    return this.TransactionsService.findAll();
  }

}
