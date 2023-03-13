import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { generate } from 'creditcard-generator';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async create(card: Card): Promise<Card> {
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
    return await this.cardRepository.save(card);
  }

  async findAll(): Promise<Card[]> {
    return await this.cardRepository.find();
  }

//   async findOne(id: string): Promise<Card> {
//     return await this.cardRepository.findOne(id);
//   }

  async update(id: number, card: Card): Promise<void> {
    await this.cardRepository.update(id, card);
  }

  async remove(id: number): Promise<void> {
    await this.cardRepository.delete(id);
  }
}
