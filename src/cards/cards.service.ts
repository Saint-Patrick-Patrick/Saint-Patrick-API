import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardRepo: Repository<Card>,
  ) {}
  create(createCardDto: CreateCardDto) {
    return 'This action adds a new card';
  }

  findAll() {
    return `This action returns all cards`;
  }

  async findOneByCardNumber(
    card_number:number
  ):  Promise<Card | undefined>{
        return await this.cardRepo.findOneBy({card_number});
  }

 async findOne(
    id: number
    ) : Promise<Card | undefined> {
    return await this.cardRepo.findOne({
      relations:{user:true},
      where:{id}
    });
  }

  async update(
    id: number, updateCardDto: UpdateCardDto
    ) : Promise<Card | undefined>{
    const card:Card = await this.findOne(id);
    if(!card)
      throw new NotFoundException('Card not found');
      Object.assign(card, updateCardDto);
      const updateCard:Card = await this.cardRepo.save(card);
      return plainToClass(Card, updateCard) 
    }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
