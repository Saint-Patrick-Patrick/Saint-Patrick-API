import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaintPatrickCardService } from './saint-patrick-card.service';
import { CreateSaintPatrickCardDto } from './dto/create-saint-patrick-card.dto';
import { UpdateSaintPatrickCardDto } from './dto/update-saint-patrick-card.dto';

@Controller('saint-patrick-card')
export class SaintPatrickCardController {
  constructor(private readonly saintPatrickCardService: SaintPatrickCardService) {}

  @Post()
  create(@Body() createSaintPatrickCardDto: CreateSaintPatrickCardDto) {
    return this.saintPatrickCardService.create(createSaintPatrickCardDto);
  }

  @Get()
  findAll() {
    return this.saintPatrickCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saintPatrickCardService.findOne(+id);
  }

  @Get('/user/:userId')
  findOneByUserId(@Param('userId') userId: string) {
    return this.saintPatrickCardService.findOneByUserId(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaintPatrickCardDto: UpdateSaintPatrickCardDto) {
    return this.saintPatrickCardService.update(+id, updateSaintPatrickCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saintPatrickCardService.remove(+id);
  }
}

