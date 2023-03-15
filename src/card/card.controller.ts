import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Card } from './entities/card.entity';
import { CardService } from './card.service';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async findAll(): Promise<Card[]> {
    return this.cardService.findAll();
  }

  @Get(':cardId')
  async findOne(@Param('cardId') cardId: number): Promise<Card | undefined> {
    return await this.cardService.findOne(cardId);
  }

  @Post()
  async create(@Body() card: Card, @Param('userId') userId: number): Promise<Card | undefined> {
    return this.cardService.create(card, userId);
  }

  @Put(':cardId')
  async update(@Param('cardId') id: number, @Body() UpdateCardDto: UpdateCardDto) : Promise<Card | undefined> {
    return await this.cardService.update(id, UpdateCardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.cardService.remove(id);
  }
}
