import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Post('addMoney/:id')
  async addMoneyWallet(
    @Param('walletId') walletId:string, @Body() amount:number, card_number:number
    ) : Promise<string | undefined>{
      return await this.walletService.addMoney(+walletId, amount, card_number)
  }
  
  @Get()
  async findAll() : Promise<Wallet[]>{
    return await this.walletService.findAll();
  }

  @Get(':walletId')
  async findOne(@Param('walletId') walletId: string) :Promise<Wallet | undefined>{
    return await this.walletService.findOne(+walletId);
  }

  @Patch(':walletId')
  async update(@Param('walletId') walletId: string, @Body() updateWalletDto: UpdateWalletDto) : Promise<Wallet> {
    return await this.walletService.update(+walletId, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
