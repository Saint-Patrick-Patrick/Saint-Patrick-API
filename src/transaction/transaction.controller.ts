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
  BadRequestException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Request } from 'express';
import Transaction from './entities/transaction.entity';
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
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
  // @Post('/create')      
  // async register(@Body() createTransactionDto: CreateTransactionDto, @Req() req:Request & {user:any}) {
    
  //   //validar si el monto es valido 
  //   // const (bolean) = service(from, from_type, amount)
  //   // if(!amount) sali de aca puta

  //   // crear un service que pasandole el cvu, alias o cbu retorne ese To
  //   // esto se podria separar y hacerlo en services distintos
  //   // const{to, to_type, to_user} = service(cvu o cbu o alias)
 
  //   // const CardOrWallet (a quien se le envia) = 
  //   const { id } = req.user;
  //   // buscar user por id
  //   // const from_user = service(id);
    
    
  //   const algo = await this.transactionService.createTransaction({
  //    /*
  //    to,
  //    to_User,
  //    to_type,
  //    from_user,
  //    createTransactionDto
  //    */
  //   });
  // }

  @Get()
  async findAll():Promise<Transaction[]>{
    return this.transactionService.findAll();
  };
  @Post('/create')      
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto, 
    @Req() req: Request & { user: any },
  ): Promise<Transaction> {
    const { cbu, cvu, alias } = createTransactionDto;

    // Validar si el monto es válido 
    const isValidAmount: boolean = await this.transactionService.validateAmount(createTransactionDto.amount, req.user.id );
    if (!isValidAmount) {
        throw new BadRequestException('Invalid amount');
    }

    // Obtener información del destinatario
    const toInfo = await this.transactionService.getToInfo(cbu, cvu, alias);

    // Obtener información del remitente
    const userTo = await this.transactionService.getFromInfo(toInfo.toUser.id);

    // Crear la transacción
    const transaction = await this.transactionService.createTransaction(userTo ,req.user, createTransactionDto.amount);

    return transaction; 
  }

}

  // @Get('/all')
  // async findAll(){
  //   return this.transactionService.findAll();
  // }

