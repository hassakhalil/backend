import { Body, Controller, Get, Post, Req, Res, UseGuards , UseInterceptors, UploadedFile, UnauthorizedException, HttpCode} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Jwt2faAuthGuard } from './auth/jwt-2fa-auth.guard';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';
import { UsersService } from './users/users.service';
import { UsernameDto} from './users/dto/username.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { toFileStream } from 'qrcode';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService,
              private readonly usersService: UsersService,
              ) {}

  @Get('/auth')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuth(){}

  @Get('/auth/callback')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuthcallback(@Req() req: Request, @Res({ passthrough: true }) res: Response){

      const user = await this.usersService.findOne(this.authService.extractId(req.user));
      //debug
      console.log(user);
      //end debug
      //user not found in the database
      if (!user){
          //generate token
          const token  = await this.authService.login(req.user, false);
          //set the token in a cookie
          res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
          //user does not exist 
          return {
            message: 'you have to setup a username',
            endpoint:     '/setprofile',
            method: 'POST',
            body:  '{"username": "string"}'
          };
      }
      else {
        if (user.is_two_factor_auth_enabled){
          //generate token
          const token  = await this.authService.login(req.user, true);
          //set the token in a cookie
          res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
          return {
            message: 'you have to 2fa autenticate',
            endpoint: '2fa/authenticate',
            method: 'POST',
            body:   '{"twoFactorAuthCode": "string"}',
          }
        }
        else{
          //generate token
          const token  = await this.authService.login(req.user, false);
          //set the token in a cookie
          res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
        }
      }
      return user;
    }
    
  @Post('2fa/authenticate')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async authenticate(@Req() req:Request, @Body() body, @Res({ passthrough: true}) res: Response) {
    const us = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    //debug
    console.log('authenticate() us = ',us);
    //end debug
    const isCodevalid = this.authService.isTwoFactorAuthCodeValid(
      body.twoFactorAuthCode,
      us,
      );
      
      if(!isCodevalid) {
        throw new UnauthorizedException('2fa: Wrong authentication code');
      }
      const token = await this.authService.loginWith2fa(req.user, us.is_two_factor_auth_enabled);
      res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
      //check if the user exist in the datase
      
      //this should change to include all the data the frontend needs
      return us;
}
      
  @Post('/setprofile')
  @UseGuards(Jwt2faAuthGuard)
  async setprofile(@Body() usernameDto: UsernameDto, @Req() req: Request) {
        
    const user  = await this.usersService.create(usernameDto.username, this.authService.extractIdFromPayload(req.user));
    console.log({user});
    if (!user)
    return {Error: "Failed to create user"};
  
  //this should change to include all the data the frontend needs
  return user;
}

@Get('2fa/generate')
@UseGuards(Jwt2faAuthGuard)
async generateQrCode(@Res() res: Response, @Req() req:Request){
  const secret_url = await this.authService.generateTwoFactorAuthSecret(req.user);

  await this.usersService.setTwoFactorAuthSecret(
    secret_url.secret,
    this.authService.extractIdFromPayload(req.user)
    );
  const qrcode = await toFileStream(res, secret_url.otpauthUrl);
  
  return qrcode;
}

@Post('2fa/turn-on')
@UseGuards(Jwt2faAuthGuard)
async activateTwoFactorAuth(@Req() req: Request, @Body() body) {
  const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
  const isCodeValid = this.authService.isTwoFactorAuthCodeValid(
    body.twoFactorAuthCode,
    user,
  );
  if (!isCodeValid){
    throw new UnauthorizedException('2fa: Wrong authentication code');
  }
  const isActivated = await this.usersService.turnOnTwoFactorAuth(this.authService.extractIdFromPayload(req.user));
  if (!isActivated){
    return {
      message: 'Failed to activate 2fa',
    };
  }
  return {
    message: 'you successfully activated 2fa',
  }
}

  @Post('/avatar')
  @UseGuards(Jwt2faAuthGuard)
  //front end should not forget field name when making requests to this endpoint
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadavatar(@UploadedFile() photo: Express.Multer.File, @Req() req: Request){
    if (!this.usersService.updateavatar(photo.buffer, this.authService.extractIdFromPayload(req.user)))
    {
      return {
        Error: "Failed to upload avatar",
      };
    }
    return {
      message: "Avatar uploaded successfully",
    }
  }


  @Get('/profile')
  @UseGuards(Jwt2faAuthGuard)
  async  getProfile(@Req() req: Request){
    const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    return user;
  }

  @Get('/logout')
  @UseGuards(Jwt2faAuthGuard)
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
