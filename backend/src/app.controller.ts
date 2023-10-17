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
import { RoomSettingsDto } from './users/dto/roomSettings.dto';

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
      // Accept the file
      cb(null, true); 
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
          // return res.redirect("http://localhost:5173/set_username");
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
      return user.username;
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
      return us.username;
}
      
  @Post('/set-username')
  @UseGuards(JwtAuthGuard)
  async setUsername(@Body() usernameDto: UsernameDto, @Req() req: Request) {

    //check if the user already exist in the database
    const us = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    if (us){
      //update username 
      const isUpdated = await this.usersService.updateUsername(usernameDto.username, us.id);
      if (!isUpdated)
        throw new HttpException('Failed to update username', HttpStatus.BAD_REQUEST);
    }
    else{
      const isCreated  = await this.usersService.create(usernameDto.username, req.user);
      if (!isCreated)
        throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
    }
    return 'Username set seccussfully';
  }
  
  @Post('')

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
    throw new HttpException('Failed to activate 2fa', HttpStatus.BAD_REQUEST);
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
    throw new HttpException('Failed to deactivate 2fa', HttpStatus.BAD_REQUEST);
  }
  return 'You successfully deactivated 2fa';
}

  @Post('/upload-avatar')
  @UseGuards(Jwt2faAuthGuard)
  //front end should not forget field name when making requests to this endpoint
  @UseInterceptors(FileInterceptor('avatar', multerConfig))
  async uploadAvatar(@UploadedFile()file: Express.Multer.File, @Req() req: Request){
      //save the path to the database
      if (file === undefined){
        throw new HttpException('Only image files are allowed.', HttpStatus.BAD_REQUEST);
      }
      //check if the client already uploaded an avatar if yes replace it
      const path  = await this.usersService.getAvatar(this.authService.extractIdFromPayload(req.user));
      if (path.indexOf('cdn.intra.42.fr') === -1 && path !== null){
          //remove old avatar
          fs.unlinkSync(path);
      }
      const isSaved = this.usersService.updateAvatar(file.path, this.authService.extractIdFromPayload(req.user));
      if (!isSaved){
        throw new HttpException('Failed to upload avatar', HttpStatus.BAD_REQUEST);
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
        throw new HttpException('avatar not found', HttpStatus.BAD_REQUEST);
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
    let us = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    let un = username;
    if (username === 'me'){
        un = us.username;
    }
    const profileData = await this.usersService.getProfileData(un);
    if (!profileData){
      throw new HttpException('No Profile Data', HttpStatus.NOT_FOUND);
    }
    if (profileData.user_data.intra_id === this.authService.extractIdFromPayload(req.user)){
      return {
        user_data: {
            id:         profileData.user_data.id,
            username:   profileData.user_data.username,
            avatar:     profileData.user_data.avatar,
            rating:     profileData.user_data.rating,
            me:         true,
            is_two_factor_auth_enabled: profileData.user_data.is_two_factor_auth_enabled,

        },
        friends:        profileData.friends,
        match_history:  profileData.match_history,
        achievements:   profileData.achievements,
        wins:           profileData.wins,
        loses:          profileData.loses,
        draws:          profileData.draws,
      }
    }
    else{
        return {
          user_data: {
              id:         profileData.user_data.id,
              username:   profileData.user_data.username,
              avatar:     profileData.user_data.avatar,
              rating:     profileData.user_data.rating,
              me:        false,
          },
          friends:        profileData.friends,
          match_history:  profileData.match_history,
          achievements:   profileData.achievements,
          wins:           profileData.wins,
          loses:          profileData.loses,
          draws:          profileData.draws,
        }
    }
  }

  @Get('/load-user/:id')
  @UseGuards(Jwt2faAuthGuard)
  async loadUser(@Param('id') id: string) {
      const user = await this.usersService.findById(+id);
      if (!user){
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
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
    return 'Logged out seccussfully';
  }

  //chat

  @Post('/add-friend/:username')
  @UseGuards(Jwt2faAuthGuard)
  async addFriend(@Req() req: Request, @Param('username') username: string){
    //check if the user is already a friend or the user is trying to add himself
    let us = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    if (us.username === username){
      throw new HttpException('You are trying to add yourself as a friend', HttpStatus.BAD_REQUEST);
    }
    const isAdded = await this.usersService.addFriend(us.id, username);
    if (!isAdded){
      throw new HttpException('Failed to add friend', HttpStatus.BAD_REQUEST);
    }
    //emit to notifications event "friend request"
    return 'Friend added seccussfully';
  }



  @Post('/accept-friend/:username')
  @UseGuards(Jwt2faAuthGuard)
  async acceptFriend(@Req() req: Request, @Param('username') username: string){
    //check if the friendship exists and the user is the acceptor
    let us = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    const isAccepted = await this.usersService.acceptFriend(us.id, username);
    if (!isAccepted){
      throw new HttpException('Failed to accept friend', HttpStatus.BAD_REQUEST);
    }
    //create rooms for private chat here
    const isCreated = await this.usersService.createDirectRoom(us.id, username);
    return 'Friend accepted seccussfully';
  }

  @Post('/block-friend/:username')
  @UseGuards(Jwt2faAuthGuard)
  async blockFriend(@Req() req: Request, @Param('username') username: string){
    // add the username as blocked by this user in the managament table (private chat)
    //check if the user is trying to block himself
    const us = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    if (us.username === username){
      throw new HttpException('You are trying to block yourself', HttpStatus.BAD_REQUEST);
    }
    const isBlocked = await this.usersService.updateBlockState(us.id, username, true);
    if (!isBlocked){
      throw new HttpException('Failed to block friend', HttpStatus.BAD_REQUEST);
    }
    return 'Friend blocked seccussfully';
  }

  @Post('/unblock-friend/:username')
  @UseGuards(Jwt2faAuthGuard)
  async unblockFriend(@Req() req: Request, @Param('username') username: string){
    // add the username as blocked by this user in the managament table (private chat)
    //check if the user is trying to block himself
    const us = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    if (us.username === username){
      throw new HttpException('You are trying to unblock yourself', HttpStatus.BAD_REQUEST);
    }
    const isBlocked = await this.usersService.updateBlockState(us.id, username,false);
    if (!isBlocked){
      throw new HttpException('Failed to unblock friend', HttpStatus.BAD_REQUEST);
    }
    return 'Friend unblocked seccussfully';
  }

  @Post('/create-room')
  @UseGuards(Jwt2faAuthGuard)
  async createRoom(@Req() req: Request, @Body() body: RoomSettingsDto){
        const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
        const isCreated = await  this.usersService.CreateRoom(user.id, body);
        if (!isCreated)
          throw new HttpException('Failed to create room', HttpStatus.BAD_REQUEST);
        return 'Room created seccussfully';
  }
  
  
  @Post('/join-room')
  @UseGuards(Jwt2faAuthGuard)
  async joinRoom(@Req() req: Request, @Body() body: RoomSettingsDto){
    //check the user is already in the room
    const user  = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
      const userExits = await this.usersService.checkIfUserExistsInRoom(user.id, body.name);
      if (userExits)
        throw new HttpException('You are already in this room', HttpStatus.BAD_REQUEST);
      if (body.type === 'private'){
        //notify the room owner
      }
      const isJoined = await this.usersService.joinRoom(user.id, body);
      if (!isJoined)
        throw new HttpException('Failed to join room', HttpStatus.BAD_REQUEST);
      return 'Room joined seccussfully';
  }
    
  // @Post('/leave-room')
  // @UseGuards(Jwt2faAuthGuard)
  // async leaveRoom(){

  // }

  // @Post('/accept-member')
  // @UseGuards(Jwt2faAuthGuard)
  // async acceptMember(){

  // }

  // @Post('/set-admin')
  // @UseGuards(Jwt2faAuthGuard)
  // async setAdmin(){

  // }


  // @Post('/set-room-password')
  // @UseGuards(Jwt2faAuthGuard)
  // async setRoomPassword(){

  // }


  // @Post('/change-room-password')
  // @UseGuards(Jwt2faAuthGuard)
  // async changeRoomPassword(){

  // }

  // @Post('/remove-room-password')
  // @UseGuards(Jwt2faAuthGuard)
  // async removeRoomPassword(){

  // }

  // @Post('/kick-member')
  // @UseGuards(Jwt2faAuthGuard)
  // async kickMember(){

  // }


  // @Post('/mute-member')
  // @UseGuards(Jwt2faAuthGuard)
  // async muteMember(){

  // }

  // @Post('/unmute-member')
  // @UseGuards(Jwt2faAuthGuard)
  // async unmuteMember(){

  // }

  // @Post('/ban-member')
  // @UseGuards(Jwt2faAuthGuard)
  // async banMember(){

  // }


  // @Post('/allow-member')
  // @UseGuards(Jwt2faAuthGuard)
  // async allowMember(){

  // }

  // @Get('get-all-rooms')
  // @UseGuards(Jwt2faAuthGuard)
  // async getRooms(){

  // }

  // @Get('get-room/:roomId')
  // @UseGuards(Jwt2faAuthGuard)
  // async getRooms(){

  // }



}
