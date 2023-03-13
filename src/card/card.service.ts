import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { generate } from 'creditcard-generator';
import User from 'src/users/entities/user.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(card: Card, userId: number): Promise<Card> {
    let generatedCardNumber: string;
    let existingCard: Card;
    do {
      generatedCardNumber = generate({creditCardNumberPrefixes: ['4'], length: 16})[0];
   
      existingCard = await this.cardRepository.findOne({
        where: {
          numberCard: generatedCardNumber,
        },
      });
    } while (existingCard);
    card.numberCard = generatedCardNumber;
    const user = await this.userRepository.findOne({where:{ id: userId }});
    card.user = user;
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

  async findAll(): Promise<Card[]> {
    return await this.cardRepository.find();
  }

  async findOne(id: string): Promise<Card> {
    return await this.cardRepository.findOne({where:{id}});
  }
 

  async update(id: number, card: Card): Promise<void> {
    await this.cardRepository.update(id, card);
  }

  async remove(id: number): Promise<void> {
    await this.cardRepository.delete(id);
  }
}
