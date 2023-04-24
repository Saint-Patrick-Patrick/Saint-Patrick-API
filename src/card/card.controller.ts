import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Card } from './entities/card.entity';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
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
  async create(@Body() createCardDto: CreateCardDto, @Param('userId') userId: string): Promise<Card | undefined> {
    return this.cardService.create(createCardDto, userId);
  }

  @Put(':cardId')
  async update(@Param('cardId') id: number, @Body() updateCardDto: UpdateCardDto) : Promise<Card | undefined> {
    return await this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.cardService.remove(id);
  }
}
