import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Wallet } from 'src/wallet/entities/wallet.entity';
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

  async findOne(
    id: number
    ): Promise<SaintPatrickCard | undefined> {
    return await this.saintPatrickCardRepo.findOne({
      relations:{wallet:true},
      where:{id}
    });
  }

  async update(
    id: number, updateSaintPatrickCardDto: UpdateSaintPatrickCardDto
    ): Promise<SaintPatrickCard | undefined> {
      const saintPatrickCard:SaintPatrickCard = await this.findOne(id)
      if(!saintPatrickCard) 
        throw new NotFoundException('wallet not found')
      Object.assign(saintPatrickCard, updateSaintPatrickCardDto)
      const updatedSaint = await this.saintPatrickCardRepo.save(saintPatrickCard);
      return plainToClass(SaintPatrickCard, updatedSaint);
  }

  remove(id: number) {
    return `This action removes a #${id} saintPatrickCard`;
  }
}
