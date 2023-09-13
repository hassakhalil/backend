import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Token } from './auth/token.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('/auth')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuth(@Req() req){}

  @Get('/auth/callback')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuthcallback(@Req() req, @Res() res){
      //Handle the successful 42 oauth2 authentication callback here
      //if the user already exist redirect to home
      //if not redirect to make a profile and save it to the database(choose a unique name and upload an avatar)
      //  return this.authService.generateJwt(req.user);
      const token = await this.authService.generateJwt(req.user);

      res.setHeader('Authorization', 'Bearer ' + token);
      
      return res.json({
        home: ' you are logged in, this should be your home page if youre already a user in and profile setup if youre new',
      });
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req){
    return {
      profile: "this is your profile ",
    };
  }

  @Get('/logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() request, @Token() token: string){
    //debug
    console.log("token extracted from request=========",token);
    //end debug
    this.authService.addToBlacklist(token);
    return {
      logout: "token has been blacklisted",
    };
  }


}
