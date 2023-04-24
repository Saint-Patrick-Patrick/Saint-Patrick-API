import { 
  Injectable,
  NotFoundException,
  BadRequestException
   } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { generate } from 'creditcard-generator';
import User from 'src/user/entities/user.entity';
import { UpdateCardDto } from './dto/update-card.dto';
import { plainToClass } from 'class-transformer';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './entities/card.entity';
import { cardNumbers } from 'src/core/constants/contansts';


@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createCardDto: CreateCardDto, userId: string, ): Promise<Card> {
    const verifyCard: Card | null = await this.findOneByCardNumber(createCardDto.cardNumber);
    if(verifyCard) 
      throw new BadRequestException('La tarjeta ya esta registrada en un usuario');
    const user: User | null = await this.userRepository.findOne({relations:{cards:true},where:{ id: userId }});
    if(!user)
    throw new BadRequestException('UPS el usuario no existe');

    createCardDto.amount = Math.floor(Math.random() * 100000);
    const existCardExternal: number = cardNumbers[createCardDto.cardNumber[0]];
    if(!existCardExternal)
      throw new BadRequestException('Numbero de tarjeta invalido');
    
    const card: Card = await this.cardRepository.create(createCardDto);
    card.user = user;
    user.cards = [...user.cards, card];
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
      relations:{user:true},
      where: {cardNumber}
    });
  }

  async findAll(): Promise<Card[]> {
    return await this.cardRepository.find();
  }

  async findOne(cardId: number): Promise<Card | undefined> {
    return await this.cardRepository.findOne({
      relations:{user:true},
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
