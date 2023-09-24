import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Get('/auth')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuth(){}

  @Get('/auth/callback')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuthcallback(@Req() req: Request, @Res({ passthrough: true }) res: Response){
      //Handle the successful 42 oauth2 authentication callback here
      const token  = await this.authService.generateJwt(req.user);
      res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
      const user = this.usersService.findOne(req.user);
      if (!user)
      {
        //user does not exist 
        this.usersService.create(req.user);
        return {
          message: 'user doesnt exist',
          todo:     'ask the user to enter a unique username and to upload an avatar',
          next:   'hit /setprofile with a post request and include the user data'
        };
      }

      //check if the user already exist in the database (check by intra id)
        //if the user doesnt exist ask him to enter  unique username and avatar + save the new user ther the data base
        //(?????should i force the user to enter unique username and avatar????????)
        ///return the user profile from the data base
      return {
        profile: 'profile data',
      };
  }

  @Post('/setprofile')
  @UseGuards(JwtAuthGuard)
  setprofile() {
      //add the username and avatar if any to the database user record
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
