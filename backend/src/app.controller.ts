import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('/auth')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuth(){}

  @Get('/auth/callback')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuthcallback(@Req() req: Request, @Res({ passthrough: true }) res: Response){
      //Handle the successful 42 oauth2 authentication callback here
      //if the user already exist redirect to home
      //if not redirect to make a profile and save it to the database(choose a unique name and upload an avatar)
      const token  = await this.authService.generateJwt(req.user);
      res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
      
      return {
        home: ' you are logged in, this should be your home page if youre already a user in and profile setup if youre new',
      };
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getProfile(){
    return {
      profile: "Profile",
    };
  }

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() request: Request, @Res({ passthrough: true}) response: Response){
    //blacklist the jwt
    const token  = request.cookies.jwt;
    this.authService.addToBlacklist(token);
    //clear the cookie
    response.clearCookie('jwt');
    return {
      logout: "Logged out seccussfully",
    };
  }


}
