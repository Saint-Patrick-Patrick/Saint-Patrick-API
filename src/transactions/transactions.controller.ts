import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Request } from 'express';
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
  ) {}


  /*
  transactionDTO{
    esto viene por body
    ----------------
    |cvu?, (!)     |  displey: flex
    |cbu?, (!)     |  justify-content: center
    |alias?, (!)   |
    |amount!,      |
    |from!:        |
    |from_type!:   |
    ----------------
    esto no pasa por body
    --to:
    --to_type:
    --to_user:
    --from_User:
  }
  
  */
  @Post('/create')      
  async register(@Body() createTransactionsDto: CreateTransactionsDto, @Req() req:Request & {user:any}) {
    
    //validar si el monto es valido 
    // const (bolean) = service(from, from_type, amount)
    // if(!amount) sali de aca puta

    // crear un service que pasandole el cvu, alias o cbu retorne ese To
    // esto se podria separar y hacerlo en services distintos
    // const{to, to_type, to_user} = service(cvu o cbu o alias)
 
    // const CardOrWallet (a quien se le envia) = 
    const { id } = req.user;
    // buscar user por id
    // const from_user = service(id);
    
    
    const algo = await this.transactionsService.createTransactions({
     /*
     to,
     to_User,
     to_type,
     from_user,
     createTransactionsDto
     */
    });
  }

  @Get('/all')
  async findAll(){
    return this.transactionsService.findAll();
  }

}
