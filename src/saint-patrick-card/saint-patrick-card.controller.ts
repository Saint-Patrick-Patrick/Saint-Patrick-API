import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaintPatrickCardService } from './saint-patrick-card.service';
import { UpdateSaintPatrickCardDto } from './dto/update-saint-patrick-card.dto';
import { Req } from '@nestjs/common/decorators';
import SaintPatrickCard from './entities/saint-patrick-card.entity';

@Controller('saint-patrick-card')
export class SaintPatrickCardController {
  constructor(private readonly saintPatrickCardService: SaintPatrickCardService) {}

  @Post()
  async authUser(@Req() req: Request & { user: any }): Promise<SaintPatrickCard> {
    const { id } = req.user;
    return this.saintPatrickCardService.create(id);
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

