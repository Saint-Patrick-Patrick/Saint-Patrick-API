import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserService } from 'src/user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
   constructor(
      private readonly userervice: UserService,
   ){}


 @Get('google')
 @UseGuards(AuthGuard('google'))
 async googleLogin():Promise<any>{
    return httpStatus.OK;
 }
 @Get('google/callback')
 @UseGuards(AuthGuard('google'))
 async googleLoginRedirect(@Req() req:Request & { user?: any },@Res() res:Response):Promise<any>{
   const {user, token} = await this.userervice.findOrCreate(req.user);
   return res.redirect(`${process.env.URL_FRONT}/login?token=${token}`)
 }

 @Get('facebook')
 @UseGuards(AuthGuard('facebook'))
 async facebookLogin():Promise<any>{
    return httpStatus.OK;
 }
 @Get('facebook/callback')
 @UseGuards(AuthGuard('facebook'))
 async facebookLoginRedirect(@Req() req:Request & { user?: any },@Res() res:Response):Promise<any>{   
   const {user, token} = await this.userervice.findOrCreate(req.user);
   return res.redirect(`${process.env.URL_FRONT}/login?token=${token}`)

 }
}