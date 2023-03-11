import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import httpStatus from 'http-status';
import { UsersService } from 'src/users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
   constructor(
      private readonly userService: UsersService,
   ){}


 @Get('google')
 @UseGuards(AuthGuard('google'))
 async googleLogin():Promise<any>{
    return httpStatus.OK;
 }
 @Get('google/callback')
 @UseGuards(AuthGuard('google'))
 async googleLoginRedirect(@Req() req:Request& { user?: any }):Promise<any>{
   return await this.userService.findOrCreate(req.user);
 }
 @Get('facebook')
 @UseGuards(AuthGuard('facebook'))
 async facebookLogin():Promise<any>{
    return httpStatus.OK;
 }
 @Get('facebook/callback')
 @UseGuards(AuthGuard('facebook'))
 async facebookLoginRedirect(@Req() req:Request):Promise<any>{   
    return this.userService.findOrCreate(req.body);
 }
}