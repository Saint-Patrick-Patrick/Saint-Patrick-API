import { 
  Injectable,
  NotFoundException,

   } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { generate } from 'creditcard-generator';
import User from 'src/users/entities/user.entity';
import { UpdateCardDto } from './dto/update-card.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(card: Card, userId: number, ): Promise<Card> {

    const user = await this.userRepository.findOne({relations:{cards:true},where:{ id: userId }});
    card.users = [...card.users,user];
    return await this.cardRepository.save(card);
  }
  
  async findOneByUserId(userId: number): Promise<Card> {
    const card = await this.cardRepository
      .createQueryBuilder('card')
      .leftJoinAndSelect('card.user', 'user')
      .where('user.id = :userId', { userId })
      .getOne();
    return card;
  }

  async findOneByCardNumber(cardNumber:string): Promise<Card | undefined>{
    return await this.cardRepository.findOne({
      relations:{users:true},
      where: {cardNumber}
    });
  }

  async findAll(): Promise<Card[]> {
    return await this.cardRepository.find();
  }

  async findOne(cardId: number): Promise<Card | undefined> {
    return await this.cardRepository.findOne({
      relations:{users:true},
      where:{id:cardId}
    });
  }

  async update(
    cardId: number, updateCardDto: UpdateCardDto
    ) : Promise<Card | undefined>{
    const card:Card = await this.findOne(cardId);
    if(!card)
      throw new NotFoundException('Card not found');
      Object.assign(card, updateCardDto);
      const updateCard:Card = await this.cardRepository.save(card);
      return plainToClass(Card, updateCard) 
    }

  async remove(id: number): Promise<void> {
    await this.cardRepository.delete(id);
  }
}
