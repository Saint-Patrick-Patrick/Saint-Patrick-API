import { 
  Injectable, 
  NotFoundException,
   BadRequestException,
  HttpException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Repository } from 'typeorm';
import { CreateSaintPatrickCardDto } from './dto/create-saint-patrick-card.dto';
import { UpdateSaintPatrickCardDto } from './dto/update-saint-patrick-card.dto';
import SaintPatrickCard from './entities/saint-patrick-card.entity';
import * as CreditCardGenerator from 'creditcard-generator';
import httpStatus from 'http-status';

@Injectable()
export class SaintPatrickCardService {
  constructor(
    @InjectRepository(SaintPatrickCard)
    private readonly saintPatrickCardRepository: Repository<SaintPatrickCard>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
 
  ) {}

  async create(
    id: string,
  ): Promise<SaintPatrickCard> {

    const wallet : Wallet | undefined = await this.walletRepository.findOne({
      where: { user:{id:Number(id)} },
      relations:['user', 'saintPatrickCard']
    });
    console.log(wallet);
    
    if (!wallet) 
      throw new NotFoundException(`Wallet with ID ${id} not found`);
    

    const existingSaintPatrickCard : SaintPatrickCard | undefined = await this.saintPatrickCardRepository.findOne({
      where: { wallet: { id: wallet.id } },
      relations: ['wallet'],
    });

    if(existingSaintPatrickCard) throw new BadRequestException('Saint Patrick Existing');
    
    const cardNumber:string = await this.CreateNumberCard();
  
    const saintPatrickCard : SaintPatrickCard = this.saintPatrickCardRepository.create({
      cardNumber,
      wallet
    });
    return await this.saintPatrickCardRepository.save(saintPatrickCard);
  }
  
  private async CreateNumberCard(): Promise<string>{
    let cardNumber:number;
    let isCardNumberUnique:boolean = false;
    let generateCardNumber:string;

    while (!isCardNumberUnique) {
      generateCardNumber = CreditCardGenerator.GenCC('VISA')[0];
      cardNumber = Number( '7777'+ generateCardNumber.slice(4));
      const card: SaintPatrickCard | undefined = await this.findOneByCardNumber(cardNumber.toString());
      isCardNumberUnique = !card;
    }
    return cardNumber.toString();
  };

  async findOneByUserId(userId: number): Promise<SaintPatrickCard> {
    const saintPatrickCard : SaintPatrickCard | undefined = await this.saintPatrickCardRepository.findOne({
      where: { wallet: { user: { id: userId } } },
    });
    if (!saintPatrickCard) {
      throw new NotFoundException(`SaintPatrickCard not found`);
    }
    return saintPatrickCard;
  }

  async findAll(): Promise<SaintPatrickCard[]> {
    return await this.saintPatrickCardRepository.find();
  }

  async findOneByCardNumber(cardNumber:string): 
    Promise<SaintPatrickCard | undefined>{
      return await this.saintPatrickCardRepository.findOne({
        relations:{wallet:true},
        where:{cardNumber}
      });
  }

  async update(
    id: number, updateSaintPatrickCardDto: UpdateSaintPatrickCardDto
    ): Promise<SaintPatrickCard | undefined> {
      const saintPatrickCard:SaintPatrickCard = await this.findOne(id)
      if(!saintPatrickCard) 
        throw new NotFoundException('wallet not found')
      Object.assign(saintPatrickCard, updateSaintPatrickCardDto)
      const updatedSaint = await this.saintPatrickCardRepository.save(saintPatrickCard);
      return plainToClass(SaintPatrickCard, updatedSaint);
    }

  async findOne(id: number): Promise<SaintPatrickCard> {
    const saintPatrickCard = await this.saintPatrickCardRepository.findOne({
      relations:{wallet:true},
      where:{id}
    });
    if (!saintPatrickCard) {
      throw new NotFoundException(`SaintPatrickCard with ID ${id} not found`);
    }
    return saintPatrickCard;
  }

  async remove(id: number): Promise<string | undefined> {
    const saintPatrickCard = await this.findOne(id);
    if(!saintPatrickCard)
      throw new NotFoundException('Saint Patrick Card not found')
    await this.saintPatrickCardRepository.remove(saintPatrickCard);
    return 'Card Saint Patrick deleted succesfully';
  }
}
