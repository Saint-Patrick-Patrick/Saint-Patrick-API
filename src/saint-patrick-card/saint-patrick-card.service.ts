import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreditCardGenerator from 'creditcard-generator';
import { CreateSaintPatrickCardDto } from './dto/create-saint-patrick-card.dto';
import { UpdateSaintPatrickCardDto } from './dto/update-saint-patrick-card.dto';
import { SaintPatrickCard } from './entities/saint-patrick-card.entity';
import { Wallet } from '../wallet/entities/wallet.entity';

@Injectable()
export class SaintPatrickCardService {
  constructor(
    @InjectRepository(SaintPatrickCard)
    private readonly saintPatrickCardRepository: Repository<SaintPatrickCard>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async create(
    createSaintPatrickCardDto: CreateSaintPatrickCardDto,
  ): Promise<SaintPatrickCard> {
    const { walletId, ...rest } = createSaintPatrickCardDto;
    let cardNumber;
    let isCardNumberUnique = false;
  
    while (!isCardNumberUnique) {
      cardNumber = Number(CreditCardGenerator.GenCC('VISA')[0]);
  
      const card = await this.saintPatrickCardRepository.findOne({
        where: { card_number: cardNumber },
      });
  
      isCardNumberUnique = !card;
    }
  
    const wallet = await this.walletRepository.findOne({
      where: { id: walletId },
    });
  
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found`);
    }
  
    const pin = Math.floor(Math.random() * 9000) + 1000;
  
    const saintPatrickCard = this.saintPatrickCardRepository.create({
      ...rest,
      card_number: cardNumber,
      PIN: pin,
    });
  
    saintPatrickCard.wallet = wallet;
    return await this.saintPatrickCardRepository.save(saintPatrickCard);
  }
  
  async findOneByUserId(userId: number): Promise<SaintPatrickCard> {
    const saintPatrickCard = await this.saintPatrickCardRepository.findOne({
      where: { wallet: { user: { id: userId } } },
    });
    if (!saintPatrickCard) {
      throw new NotFoundException(`SaintPatrickCard not found`);
    }
    return saintPatrickCard;
  }

  async findAll(): Promise<SaintPatrickCard[]> {
    return await this.saintPatrickCardRepository.find();
  }

  async findOne(id: number): Promise<SaintPatrickCard> {
    const saintPatrickCard = await this.saintPatrickCardRepository.findOne({
      where: { id },
      relations: ['wallet'],
    });
    if (!saintPatrickCard) {
      throw new NotFoundException(`SaintPatrickCard with ID ${id} not found`);
    }
    return saintPatrickCard;
  }

  async update(
    id: number,
    updateSaintPatrickCardDto: UpdateSaintPatrickCardDto,
  ): Promise<SaintPatrickCard> {
    const saintPatrickCard = await this.findOne(id);
    const updatedFields = {};

    for (const [key, value] of Object.entries(updateSaintPatrickCardDto)) {
      // Si la propiedad existe en la entidad, añadirla al objeto de campos actualizados
      if (key in saintPatrickCard) {
        updatedFields[key] = value;
      }
    }
    // Actualizar la entidad con los campos actualizados y guardarla en la base de datos
    this.saintPatrickCardRepository.merge(saintPatrickCard, updatedFields);
    return await this.saintPatrickCardRepository.save(saintPatrickCard);
  }

  async remove(id: number): Promise<void> {
    const saintPatrickCard = await this.findOne(id);
    await this.saintPatrickCardRepository.remove(saintPatrickCard);
  }
}
