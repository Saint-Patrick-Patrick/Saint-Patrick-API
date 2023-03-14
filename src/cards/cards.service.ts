import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
