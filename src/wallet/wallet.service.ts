import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import {Chance} from 'chance';

const chance = new Chance();

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
  ) {}
  async createRandomWallet(): Promise<Wallet> {
    const wallet = await this.walletRepository.create({
      cvu: this.generateRandomCvu(),
      alias: await this.generateRandomAlias(),
      amount: await this.generateRandomAmount(),
    });
    return await this.walletRepository.save(wallet);
  }
  private generateRandomCvu(): string {
    const bankIdentifier = '007'; // Identificador del banco (siempre es '007' para bancos en Argentina)
    const appIdentifier = '777'; // Identificador de tu aplicación
    const cvuLength = 22; // Longitud total del CVU
    const customerIdentifierLength = 8; // Longitud de los dígitos de identificación del cliente

    // Generar dígitos de identificación de la sucursal (4 dígitos)
    const branchIdentifier = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

    // Generar dígitos de identificación del cliente (8 dígitos)
    const customerIdentifier = Math.floor(
      Math.random() * Math.pow(10, customerIdentifierLength),
    )
      .toString()
      .padStart(customerIdentifierLength, '0');

    // Generar dígitos de control (7 dígitos)
    const controlDigits = this.generateVerhoeffControlDigits(
      `${bankIdentifier}${branchIdentifier}${appIdentifier}${customerIdentifier}`,
    );

    // Concatenar todas las partes del CVU
    const cvu = `${bankIdentifier}${branchIdentifier}${appIdentifier}${customerIdentifier}${controlDigits}`;

    return cvu;
  }
  private generateVerhoeffControlDigits(input: string): string {
    // Tabla de multiplicación Verhoeff
    const multiplicationTable = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];

    // Tabla de permutación Verhoeff
    const permutationTable = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];

    // Paso 1: Convertir cada dígito del input a su equivalente en la tabla de multiplicación
    const digits = input.split('').map((digit) => parseInt(digit, 10));
    const tableDigits = digits.map((digit) => multiplicationTable[digit]);

    // Paso 2: Aplicar las permutaciones a los dígitos obtenidos en el paso anterior
    const reversedTableDigits = tableDigits.reverse();
    const permutationIndices = [...Array(reversedTableDigits.length).keys()];
    const permutedDigits = permutationIndices.map(
      (index) =>
        reversedTableDigits[index][
          permutationTable[index % 8][digits.length % 8]
        ],
    );

    // Paso 3: Calcular los dígitos de control mediante la suma de los dígitos obtenidos en el paso anterior
    const controlDigits = [...Array(5).keys()].reduce((acc, _, i) => {
      const controlDigit =
        permutedDigits
          .slice(i * 5, (i + 1) * 5)
          .reduce((sum, digit) => sum + digit, 0) % 10;
      return acc + controlDigit;
    }, '');

    return controlDigits;
  }

  private async generateRandomAlias(): Promise<string> {
    const firstName = chance.word({ syllables: 3 });
  const lastName = chance.word({syllables: 3} );
  const alias = `${firstName}.${lastName}.${chance.word({syllables: 4 })}`;

  return alias;

  }

  private async generateRandomAmount(): Promise<number> {
    const randomAmount = Math.random() * (2000 - 100) + 100;
    const roundedAmount = Math.round(randomAmount * 100) / 100; 
    return roundedAmount;
  }

  create(createWalletDto: CreateWalletDto) {
    return 'This action adds a new wallet';
  }

  findAll() {
    return this.walletRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
