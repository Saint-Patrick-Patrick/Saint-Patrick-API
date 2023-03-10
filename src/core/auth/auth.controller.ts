import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import httpStatus from 'http-status';


@Controller('auth')
export class AuthController {
 @Get('google')
 @UseGuards(AuthGuard('google'))
 async googleLogin():Promise<any>{
    return httpStatus.OK;
 }
 @Get('google/callback')
 @UseGuards(AuthGuard('google'))
 @Redirect('',302)
 async googleLoginRedirect(@Req() req:Request):Promise<any>{
    console.log(req);
    
    return 
 }
 @Get('facebook')
 @UseGuards(AuthGuard('facebook'))
 async facebookLogin():Promise<any>{
    return httpStatus.OK;
 }
 @Get('facebook/callback')
 @UseGuards(AuthGuard('facebook'))
 @Redirect('',302)
 async facebookLoginRedirect(@Req() req:Request):Promise<any>{
    console.log(req);
    
    return httpStatus.OK;
 }
}