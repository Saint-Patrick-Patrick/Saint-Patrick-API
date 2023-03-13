import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Card } from './entities/card.entity';
import { CardService } from './card.service';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async findAll(): Promise<Card[]> {
    return this.cardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Card> {
    return this.cardService.findOne(id);
  }

  @Post()
  async create(@Body() card: Card, @Param('userId') userId: number): Promise<Card> {
    return this.cardService.create(card, userId);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() card: Card): Promise<void> {
    await this.cardService.update(id, card);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.cardService.remove(id);
  }
}
