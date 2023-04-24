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

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() 
    createUserDTO: CreateUserDto,
  ): Promise<{ user: User; token: any }> {
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
  async authUser(@Req() req: Request & { user: any }): Promise<User> {
    const { id } = req.user;
    
    return this.userService.findOne(id);
  }
  @Patch('update')
  async update(
    req: Request & { user: any },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
