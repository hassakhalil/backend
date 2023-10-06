import { Body, Controller, Get, Post, Req, Res, UseGuards , UseInterceptors, UploadedFile, UnauthorizedException, HttpCode, ParseFilePipeBuilder, HttpStatus, HttpException, Param} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Jwt2faAuthGuard } from './auth/jwt-2fa-auth.guard';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';
import { UsersService } from './users/users.service';
import { UsernameDto} from './users/dto/username.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { toFileStream } from 'qrcode';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import * as fs from 'fs';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null,  process.env.UPLOAD_PATH);
    },
    filename:(req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random()*1e9);
        //add file type check (file filter)
        cb(null, uniquePrefix+'-'+file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    // Check if the file's MIME type is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept the file
    } 
    else {
       // Reject the file
       cb(null,false);
    }
  },
  limits: {
    fileSize: 1024*1024*2, // 2 MB (adjust as needed)
  },
  //add file filter here
};


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
      //user not found in the database
      if (!user){
          //generate token
          const token  = await this.authService.login(req.user, false);
          //set the token in a cookie
          res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
          //user does not exist 
          return {
            message: 'you have to setup a username',
            nextEndpoint:     '/set-username',
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
            nextEndpoint: '2fa/authenticate',
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
      return 'Youre logged in';
    }
    
  @Post('2fa/authenticate')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async authenticate(@Req() req: Request, @Body() body, @Res({ passthrough: true}) res: Response) {
    const us = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    const isCodevalid = this.authService.isTwoFactorAuthCodeValid(
      body.twoFactorAuthCode,
      us,
      );
      
      if(!isCodevalid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
      const token = await this.authService.loginWith2fa(req.user, us.is_two_factor_auth_enabled);
      res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
      return 'Youre logged in with 2fa';
}
      
  @Post('/set-username')
  @UseGuards(JwtAuthGuard)
  async setUsername(@Body() usernameDto: UsernameDto, @Req() req: Request) {
        
    const isCreated  = await this.usersService.create(usernameDto.username, req.user);
    if (!isCreated)
      throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
    return {
      username :usernameDto.username,
    };
}

@Get('2fa/generate-qrcode')
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
    throw new UnauthorizedException('Wrong authentication code');
  }
  const isActivated = await this.usersService.updateTwoFactorAuthState(this.authService.extractIdFromPayload(req.user), true);
  if (!isActivated){
    throw new HttpException('Failed to activate 2fa', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  return 'You successfully activated 2fa';
}

@Post('2fa/turn-off')
@UseGuards(Jwt2faAuthGuard)
async deactivateTwoFactorAuth(@Req() req: Request, @Body() body) {
  const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
  const isCodeValid = this.authService.isTwoFactorAuthCodeValid(
    body.twoFactorAuthCode,
    user,
  );
  if (!isCodeValid){
    throw new UnauthorizedException('Wrong authentication code');
  }
  const isDesactivated = await this.usersService.updateTwoFactorAuthState(this.authService.extractIdFromPayload(req.user), false);
  if (!isDesactivated){
    throw new HttpException('Failed to deactivate 2fa', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  return 'You successfully deactivated 2fa';
}

  @Post('/upload-avatar')
  @UseGuards(Jwt2faAuthGuard)
  //front end should not forget field name when making requests to this endpoint
  @UseInterceptors(FileInterceptor('avatar', multerConfig))
  async uploadAvatar(@UploadedFile()file: Express.Multer.File, @Req() req: Request){
      //save the path to the database
      if (file === undefined)
      {
        throw new HttpException('Only image files are allowed.', HttpStatus.BAD_REQUEST);
      }
      //check if the client already uploaded an avatar if yes replace it
      const path  = await this.usersService.getAvatar(this.authService.extractIdFromPayload(req.user));
      if (path.indexOf('cdn.intra.42.fr') === -1 && path !== null)
      {
          //remove old avatar
          fs.unlinkSync(path);
      }
      const isSaved = this.usersService.updateAvatar(file.path, this.authService.extractIdFromPayload(req.user));
      if (!isSaved)
      {
        throw new HttpException('Failed to upload avatar', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return 'Avatar uploaded seccussfully';
    }

      //return the avatar of "username" instead of the current user
  @Get('/get-avatar/:username')
  @UseGuards(Jwt2faAuthGuard)
  async getAvatar(@Param('username') username: string, @Req() req: Request, @Res() res: Response) {
      //get the avatar path from the database
      const path = await this.usersService.getAvatar(username); 
      if (!path)
      {
        throw new HttpException('avatar not found', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      if (path.indexOf('cdn.intra.42.fr') !== -1)
      {
        throw new HttpException('Get this avatar from intra', HttpStatus.NOT_FOUND);
      }
      res.setHeader('Content-Type', 'application/octet-stream');
      //get the proper filename from the path 
      const filename = path.substring(path.lastIndexOf("/")+1); 
      const hvalue = 'attachement; filename='+filename;
      res.setHeader('Content-Disposition', hvalue);
      return res.sendFile(path);
  }

  //return profile of "username" instead of the current user
  @Get('/profile/:username')
  @UseGuards(Jwt2faAuthGuard)
  async  getProfile(@Param('username') username: string, @Req() req: Request){
    const profileData = await this.usersService.getProfileData(username);
    if (!profileData)
    {
      throw new HttpException('No Profile Data', HttpStatus.NOT_FOUND);
    }
    const getIntraIdFromDb = await this.usersService.getIntraIdFromDb(username);
    const extractIdFromPayload  = this.authService.extractIdFromPayload(req.user);
    if (getIntraIdFromDb === extractIdFromPayload)
    {
        return profileData;
    }
    else{
        return {
          user_data: {
              id:       profileData.user_data.id,
              username: profileData.user_data.username,
              avatar:   profileData.user_data.avatar,
          },
          friends: profileData.friends,
          match_history: profileData.match_history,
        }
    }
  }

  @Get('/logout')
  @UseGuards(Jwt2faAuthGuard)
  logout(@Req() request: Request, @Res({ passthrough: true}) response: Response){
    //blacklist the jwt
    const token  = request.cookies.jwt;
    this.authService.addToBlacklist(token);
    //clear the cookie
    response.clearCookie('jwt');
    return 'Logged out seccussfully';
  }

  //chat

  // @Post('/add-friend')
  // @UseGuards(Jwt2faAuthGuard)
  // async addFriend(){

  // }

  // @Post('/accept-friend')
  // @UseGuards(Jwt2faAuthGuard)
  // async acceptFriend(){

  // }

  // @Post('/block-friend')
  // @UseGuards(Jwt2faAuthGuard)
  // async blockFriend(){

  // }


  // @Post('/join-room')
  // @UseGuards(Jwt2faAuthGuard)
  // async joinRoom(){

  // }

  // @Post('/accept-member')
  // @UseGuards(Jwt2faAuthGuard)
  // async acceptMember(){

  // }

  // @Post('/leave-room')
  // @UseGuards(Jwt2faAuthGuard)
  // async leaveRoom(){

  // }

  // @Post('/mute-member')
  // @UseGuards(Jwt2faAuthGuard)
  // async addFriend(){

  // }

  // @Post('/allow-member')
  // @UseGuards(Jwt2faAuthGuard)
  // async allowMember(){

  // }



}
