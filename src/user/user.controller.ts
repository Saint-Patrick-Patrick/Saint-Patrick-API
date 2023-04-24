import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import User from './entities/user.entity';
import { Request } from 'express';
import { Req } from '@nestjs/common/decorators';
import { GetUser } from 'src/core/auth/decorators';
import { AuthUserDTO } from 'src/core/auth/dto/auth-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() 
    createUserDTO: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    return this.userService.create(createUserDTO);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get()
  async findAll() : Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('auth')
  async authUser(@GetUser() user: AuthUserDTO ): Promise<User> {
    return this.userService.findOne(user.id);
  }
  @Patch('update')
  async update(
    @GetUser() user: AuthUserDTO,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
