import { Injectable } from '@nestjs/common';
import { CreateSaintPatrickCardDto } from './dto/create-saint-patrick-card.dto';
import { UpdateSaintPatrickCardDto } from './dto/update-saint-patrick-card.dto';

@Injectable()
export class SaintPatrickCardService {
  create(createSaintPatrickCardDto: CreateSaintPatrickCardDto) {
    return 'This action adds a new saintPatrickCard';
  }

  findAll() {
    return `This action returns all saintPatrickCard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saintPatrickCard`;
  }

  update(id: number, updateSaintPatrickCardDto: UpdateSaintPatrickCardDto) {
    return `This action updates a #${id} saintPatrickCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} saintPatrickCard`;
  }
}
