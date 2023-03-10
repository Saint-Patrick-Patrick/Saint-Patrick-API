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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private readonly configService: ConfigService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }
    createUserDto.password = bcrypt.hashSync(createUserDto.password, SALT);
    const createdUser = await this.usersRepo.create(createUserDto);
    return this.usersRepo.save(createdUser);
  }

  
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException();

    const token = this.generateToken(user);
    return token;
  }

  findAll() {
    return this.usersRepo.find();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findOne(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
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
  private async generateToken(user: User ){
    const token = await jwt.sign(
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
