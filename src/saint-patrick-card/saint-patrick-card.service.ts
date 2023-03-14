import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSaintPatrickCardDto } from './dto/create-saint-patrick-card.dto';
import { UpdateSaintPatrickCardDto } from './dto/update-saint-patrick-card.dto';
import SaintPatrickCard from './entities/saint-patrick-card.entity';

@Injectable()
export class SaintPatrickCardService {
  constructor(
    @InjectRepository(SaintPatrickCard) private saintPatrickCardRepo: Repository<SaintPatrickCard>
  ){}
  create(createSaintPatrickCardDto: CreateSaintPatrickCardDto) {
    return 'This action adds a new saintPatrickCard';
  }

  findAll() {
    return `This action returns all saintPatrickCard`;
  }

  async findOneByCardNumber(
    card_number:number
  ):  Promise<SaintPatrickCard | undefined>{
        return await this.saintPatrickCardRepo.findOne({
          relations:{wallet:true},
          where:{card_number}
        });
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
