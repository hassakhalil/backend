import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
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
      //generate token
      const token  = await this.authService.generateJwt(req.user);
      //set the token in a cookie
      res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
      //check if the user exist in the datase
      const user = await this.usersService.findOne(this.authService.extractId(req.user));
      
      if (!user)
      {
        //user does not exist 
        return {
          message: 'user doesnt exist',
          todo:     'ask the user to enter a unique username and to upload an avatar',
          next:   'hit /setprofile with a post request and include the user data'
        };
      }

    //this should change to include all the data the frontend needs
      return user;
  }
      
  @Post('/setprofile')
  @UseGuards(JwtAuthGuard)
  async setprofile(@Body() body: string, @Req() req:Request) {

    const user  = await this.usersService.create(body, this.authService.extractIdFromPayload(req.user));
    if (!user)
      return {Error: "Failed to create user"};
    
      //this should change to include all the data the frontend needs
    return user;
  }

  @Post('/avatar')
  @UseGuards(JwtAuthGuard)
  uploadavatar(){

  }

  @Get('twofactorauth')
  @UseGuards(JwtAuthGuard)
  twofactorauth() {

  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getProfile(){
    return {profile: "Profile"};
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
