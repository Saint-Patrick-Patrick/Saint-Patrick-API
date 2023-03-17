import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { EXPIRED_TOKEN, SALT } from 'src/constants/contansts';
import { plainToClass } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private readonly walletService: WalletService,
    private readonly configService: ConfigService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: any }> {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const wallet = await this.walletService.createRandomWallet();
    const hashedPassword = await bcrypt.hashSync(createUserDto.password, SALT);
    const createdUser = this.usersRepo.create({
      ...createUserDto,
      password: hashedPassword,
      wallet,
    });
    const user = await this.usersRepo.save(createdUser);
    const token = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ user: User; token: any }> {
    const { email, password } = loginUserDto;
    const user = await this.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException();

    const token = await this.generateToken(user);
    return { user, token };
  }

  async findOrCreate(
    body: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    let user = await this.findByEmail(body.email);
    if (!user) {
      user = await this.usersRepo.create(body);
      user.wallet = await this.walletService.createRandomWallet();
      await this.usersRepo.save(user);
    }
    const token = await this.generateToken(user);
    return {
      user,
      token,
    };
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepo
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.wallet', 'wallet')
    .leftJoinAndSelect('user.picture', 'picture')
    .leftJoinAndSelect('user.cards', 'cards')
    .getMany();

  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findOne(id: number) {

    const user = await this.usersRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.wallet', 'wallet')
      .innerJoinAndSelect('wallet.saintPatrickCard', 'saintPatrickCard')
      .where('user.id = :id', { id })
      .getOne();


    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    Object.assign(user, updateUserDto);
    const updatedUser = await this.usersRepo.save(user);
    return plainToClass(User, updatedUser);
  }

  async remove(id: number) {
    const user = await this.findOne(+id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.usersRepo.delete(id);
  }
  private async generateToken(user: User) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      this.configService.get<string>('JWT_SECRET'),
      { expiresIn: EXPIRED_TOKEN },
    );
    return token;
  }
}
