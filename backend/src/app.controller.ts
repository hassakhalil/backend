import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor() {}

  @Get('/auth')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuth(@Req() req){}

  @Get('/auth/callback')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuthcallback(@Req() req){
      //Handle the successful 42 oauth2 authentication callback here
      return req.user;
  }

  // @Get('profile')
  // @UseGuards(JwtAuthGuard)
  // getProfile(@Req() req){
  //   return req.user;
  // }
}
