import { Body, Controller, Get, Post, Req, Res, UseGuards , UseInterceptors, UploadedFile, UnauthorizedException, HttpCode, UseFilters, HttpStatus, HttpException, Param, Delete} from '@nestjs/common';
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
import { join } from 'path';
import { TfaCodeDto } from './users/dto/tfaCode.dto';
import { NotificationsService } from './chat/event.notifications';
import { CustomExceptionsFilter } from './CustomExceptionsFilter';
import { ProfileStringToDtoPipe } from './string-to-dto.pipe';
import { UsernameStringToDtoPipe } from './username-validation.pipe';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null,  join('/backend/public','avatars'));
    },
    filename:(req, file, cb) => {
        const uniquePrefix = Date.now();
        //add file type check (file filter)
        let fileExt = file.originalname.split('.').pop();
        cb(null, uniquePrefix+'.'+fileExt);
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
    private readonly notifications: NotificationsService,
    ) {}
    
    @Get('/auth')
    @UseGuards(AuthGuard('42'))
    async fortyTwoAuth(){}
    
    @Get('/auth/callback')
    @UseFilters(CustomExceptionsFilter)
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuthcallback(@Req() req: Request, @Res({ passthrough: true }) res: Response){

      const user = await this.usersService.findOne(this.authService.extractId(req.user));
      //user not found in the database
      if (!user){
          //generate token
          const token  = await this.authService.login(req.user, false);
          //set the token in a cookie
          res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
          // user does not exist 
          // return {
          //   message: 'you have to setup a username',
          //   nextEndpoint:     '/set-username',
          //   method: 'POST',
          //   body:  '{"username": "string"}'
          // };
          return res.redirect(`http://${process.env.REACT_APP_HOST}/set_username`);
      }
      else {
        if (user.is_two_factor_auth_enabled){
          //generate token
          const token  = await this.authService.login(req.user, true);
          //set the token in a cookie
          res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
          // return {
          //   message: 'you have to 2fa autenticate',
          //   nextEndpoint: '2fa/authenticate',
          //   method: 'POST',
          //   body:   '{"twoFactorAuthCode": "string"}',
          // }
          return res.redirect(`http://${process.env.REACT_APP_HOST}/2fa`);
        }
        else{
          //generate token
          const token  = await this.authService.login(req.user, false);
          //set the token in a cookie
          res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
        }
      }
      return res.redirect(`http://${process.env.REACT_APP_HOST}/profile/me`);
      // return user.username;
    }
    
  @Post('2fa/authenticate')
  @UseGuards(JwtAuthGuard)
  async authenticate(@Req() req: Request, @Body() body: TfaCodeDto, @Res({ passthrough: true}) res: Response) {
    const us = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    //check if the user has a 2fa secret
    if (!us.two_factor_auth_secret){
      throw new UnauthorizedException('You have to generate a 2fa qr code first');
    }
    const isCodevalid = this.authService.isTwoFactorAuthCodeValid(
      body.code,
      us,
      );
      
      if(!isCodevalid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
      const token = await this.authService.loginWith2fa(req.user, us.is_two_factor_auth_enabled);
      res.cookie('jwt', token, { httpOnly: true , sameSite: 'strict'});
      // return us.username;
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
    return usernameDto.username;
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
async activateTwoFactorAuth(@Req() req: Request, @Body() body: TfaCodeDto) {
  const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
  const isCodeValid = this.authService.isTwoFactorAuthCodeValid(
    body.code,
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
async deactivateTwoFactorAuth(@Req() req: Request, @Body() body: TfaCodeDto) {
  const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
  const isCodeValid = this.authService.isTwoFactorAuthCodeValid(
    body.code,
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
      const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
      const path  = await this.usersService.getAvatar(user.username);
      if (path.indexOf('cdn.intra.42.fr') === -1 && path !== null){
          //remove old avatar
          //update path before romeving it
          //ectract the filename from the path
          let newPath = path.split('/').pop();
          //debug
          console.log(newPath);
          //end debug
          fs.unlinkSync(join('/backend/public','avatars', newPath));
      }
      const isSaved = this.usersService.updateAvatar(file.filename, this.authService.extractIdFromPayload(req.user));
      if (!isSaved){
        throw new HttpException('Failed to upload avatar', HttpStatus.BAD_REQUEST);
      }
      return file.filename;
    }

  @Get('/profile/:username')
  @UseGuards(Jwt2faAuthGuard)
  async  getProfile(@Param('username', ProfileStringToDtoPipe) username: string, @Req() req: Request){
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
            state:      profileData.user_data.state,

        },
        friends:          profileData.friends,
        blocks:           profileData.blocks,
        pending_requests: profileData.pending_requests,
        match_history:    profileData.match_history,
        achievements:     profileData.achievements,
        wins:             profileData.wins,
        loses:            profileData.loses,
        draws:            profileData.draws,
      }
    }
    else{
        return {
          user_data: {
              id:         profileData.user_data.id,
              username:   profileData.user_data.username,
              avatar:     profileData.user_data.avatar,
              rating:     profileData.user_data.rating,
              me:         false,
              state:      profileData.user_data.state,
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

  @Get('/check-user/:username')
  @UseGuards(Jwt2faAuthGuard)
  async loadUser(@Param('username', ProfileStringToDtoPipe) username: string) {
    if (username === 'me')
    return {boolean:true};
    const user = await this.usersService.findByUsername(username);
    if (!user){
      return {boolean:false};
    }
    return {boolean:true};
  }

  @Get('/logout')
  @UseGuards(Jwt2faAuthGuard)
  logout(@Req() request: Request, @Res({ passthrough: true}) response: Response){
    //blacklist the jwt
    const token  = request.cookies.jwt;
    this.authService.addToBlacklist(token);
    //clear the cookie
    response.clearCookie('jwt');
    response.redirect(`http://${process.env.REACT_APP_HOST}`);
    // return 'Logged out seccussfully';
  }

  //chat

  @Post('/add-friend/:username')
  @UseGuards(Jwt2faAuthGuard)
  async addFriend(@Req() req: Request, @Param('username',UsernameStringToDtoPipe) username: string){
    //check if the user is already a friend or the user is trying to add himself
    let us = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    if (us.username === username){
      throw new HttpException('You are trying to add yourself as a friend', HttpStatus.BAD_REQUEST);
    }
    const isAdded = await this.usersService.addFriend(us.id, username);
    if (!isAdded){
      throw new HttpException('Failed to add friend', HttpStatus.BAD_REQUEST);
    }
    const friend = await this.usersService.findByUsername(username);
    this.notifications.sendFriendRequestNotification(us.id, friend.id);
    //emit to notifications event "friend request"
    return 'Friend added seccussfully';
  }



  @Post('/accept-friend/:username')
  @UseGuards(Jwt2faAuthGuard)
  async acceptFriend(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username: string){
    //check if the friendship exists and the user is the acceptor
    let us = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    if (username === us.username)
      throw new HttpException('You are trying to accept yourself as a friend', HttpStatus.BAD_REQUEST);
    const isAccepted = await this.usersService.acceptFriend(us.id, username);
    if (!isAccepted){
      throw new HttpException('Failed to accept friend', HttpStatus.BAD_REQUEST);
    }
    //create rooms for private chat here
    const isCreated = await this.usersService.createDirectRoom(us.id, username);
    // return 'Friend accepted seccussfully';
    const friend= await this.usersService.findByUsername(username);
    return {
       id: friend.id,
       username: friend.username,
       avatar:   friend.avatar
     };
  }

  @Post('/block-friend/:username')
  @UseGuards(Jwt2faAuthGuard)
  async blockFriend(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username: string){
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
  async unblockFriend(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username: string){
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
      const isJoined = await this.usersService.joinRoom(user.id, body);
      if (!isJoined)
        throw new HttpException('Failed to join room', HttpStatus.BAD_REQUEST);
      return 'Room joined seccussfully';
  }
    
  @Delete('/leave-room/:roomId')
  @UseGuards(Jwt2faAuthGuard)
  async leaveRoom(@Req() req: Request, @Param('roomId') roomId: string){
      const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
      const isLeft = await this.usersService.leaveRoom(user.id, +roomId);
      if (!isLeft)
        throw new HttpException('Failed to leave room', HttpStatus.BAD_REQUEST);
      return 'Room left seccussfully';
  }

  @Post('/add-member/:username')
  @UseGuards(Jwt2faAuthGuard)
  async AddMember(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username: string, @Body() body: RoomSettingsDto){
    const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    //check if the user is the owner of the room
    const isUserAdmin = await this.usersService.checkIfUserIsOwner(user.id, body);
    if (!isUserAdmin)
      throw new HttpException('You are not the owner of this room', HttpStatus.FORBIDDEN);
    const isAdded = await this.usersService.addMember(username, body);
    if (!isAdded)
      throw new HttpException('Failed to add member', HttpStatus.BAD_REQUEST);
    return 'Member added seccussfully';
    //
  }

  @Post('/set-admin/:username')
  @UseGuards(Jwt2faAuthGuard)
  async setAdmin(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username :string, @Body() body: RoomSettingsDto) {
    //check if the user is the owner of the room
    const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    const isUserAdmin = await this.usersService.checkIfUserIsOwner(user.id, body);
    if (!isUserAdmin)
      throw new HttpException('You are not the owner of this room', HttpStatus.FORBIDDEN);
    const isAdminSet = await this.usersService.setAdmin(username, body);
    if (!isAdminSet)
      throw new HttpException('Failed to set admin', HttpStatus.BAD_REQUEST);
    return 'Admin set seccussfully';
  }


  @Post('/set-room-password')
  @UseGuards(Jwt2faAuthGuard)
  async setRoomPassword(@Req() req: Request, @Body() body: RoomSettingsDto){
        // check if the user is the owner of the room
        const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
        const isUserAdmin = await this.usersService.checkIfUserIsOwner(user.id, body);
        if (!isUserAdmin)
          throw new HttpException('You are not the owner of this room', HttpStatus.FORBIDDEN);
        // change the room type to protected
        // update the password
        const isPasswordSet = await this.usersService.setRoomPassword(body);
        if (!isPasswordSet)
          throw new HttpException('Failed to set password', HttpStatus.BAD_REQUEST);
        return 'Password set seccussfully';        
  }

  @Post('/remove-room-password')
  @UseGuards(Jwt2faAuthGuard)
  async removeRoomPassword(@Req() req: Request, @Body() body: RoomSettingsDto){
        // check if the user is the owner of the room
        const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
        const isUserAdmin = await this.usersService.checkIfUserIsOwner(user.id, body);
        if (!isUserAdmin)
          throw new HttpException('You are not the owner of this room', HttpStatus.FORBIDDEN);
        // change the room type to public
        const isPasswordRemoved = await this.usersService.removeRoomPassword(body);
        if (!isPasswordRemoved)
          throw new HttpException('Failed to remove password', HttpStatus.BAD_REQUEST);
        return 'Password removed seccussfully';
  }

  @Delete('/kick-member/:username')
  @UseGuards(Jwt2faAuthGuard)
  async kickMember(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username: string, @Body() body: RoomSettingsDto){
        // check if the user is an admin of the room
        const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
        const isAdmin = await this.usersService.checkIfUserIsAdmin(user.id, body);
        if (!isAdmin)
          throw new HttpException('You are not an admin of this room', HttpStatus.FORBIDDEN);
        const isKicked = await this.usersService.kickUser(username, body, user.id);
        if (!isKicked)
          throw new HttpException('Failed to kick member', HttpStatus.BAD_REQUEST);
        return 'Member kicked successfully';
  }


  @Post('/mute-member/:username')
  @UseGuards(Jwt2faAuthGuard)
  async muteMember(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username: string, @Body() body: RoomSettingsDto){
        // check if the user is the owner/admin of the room
        const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
        const isAdmin = await this.usersService.checkIfUserIsAdmin(user.id, body);
        if (!isAdmin)
          throw new HttpException('You are not an admin of this room', HttpStatus.FORBIDDEN);
        const isMuted = await this.usersService.muteMemeber(username, body, user.id);
        if (!isMuted)
          throw new HttpException('Failed to mute member', HttpStatus.BAD_REQUEST);
        return 'Member muted seccussfully';
  }


  @Post('/ban-member/:username')
  @UseGuards(Jwt2faAuthGuard)
  async banMember(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username: string, @Body() body: RoomSettingsDto){
        //
        // check if the user is owner --he can ban everybody except the himself
        // check if the user is admin --he can ban everybody except the owner and other admins
        //if the user is just member he cant do shit

        const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
        const isAmdin = await this.usersService.checkIfUserIsAdmin(user.id, body);
        if (!isAmdin)
          throw new HttpException('You are not an admin of this room', HttpStatus.FORBIDDEN);
        const isBanned = await this.usersService.updateBan(username, body, true, user.id);
        if (!isBanned)
          throw new HttpException('Failed to ban member', HttpStatus.BAD_REQUEST);
        return 'Member banned seccussfully';
        // ban the member
  }


  @Post('/allow-member/:username')
  @UseGuards(Jwt2faAuthGuard)
  async allowMember(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username: string, @Body() body: RoomSettingsDto){
    // check if the user is admin
    const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    const isAmdin = await this.usersService.checkIfUserIsAdmin(user.id, body);
    if (!isAmdin)
      throw new HttpException('You are not an admin of this room', HttpStatus.FORBIDDEN);
    const isAllowed = await this.usersService.updateBan(username, body, false, user.id);
    if (!isAllowed)
      throw new HttpException('Failed to unban member', HttpStatus.BAD_REQUEST);
    return 'Member unbanned seccussfully';
  }

  @Get('get-all-rooms')
  @UseGuards(Jwt2faAuthGuard)
  async getRooms(@Req() req: Request){
    const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
      const myrooms = await this.usersService.getRooms(user.id);
      if (!myrooms)
        throw new HttpException('Failed to get rooms', HttpStatus.BAD_REQUEST);
      return myrooms;
  }

  @Get('get-room-members/:roomId')
  @UseGuards(Jwt2faAuthGuard)
  async getRoomMembers(@Req() req: Request, @Param('roomId') roomId: string){
    const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    const isMember = await this.usersService.checkIfUserExistsInRoomV2(user.id, +roomId);
    if (!isMember)
      throw new HttpException('You are not a member of this room', HttpStatus.FORBIDDEN);
    const members = await this.usersService.getRoomMembers(user.id, +roomId);
    if (!members)
      throw new HttpException('Failed to get members', HttpStatus.BAD_REQUEST);
    return members;
  }

  @Get('get-room-messages/:roomId')
  @UseGuards(Jwt2faAuthGuard)
  async getRoomMessages(@Req() req: Request, @Param('roomId') roomId: string){
    const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    const isMember = await this.usersService.checkIfUserExistsInRoomV2(user.id, +roomId);
    if (!isMember)
      throw new HttpException('You are not a member of this room', HttpStatus.FORBIDDEN);
    const messages = await this.usersService.getRoomMessages(+roomId);
    if (!messages)
      throw new HttpException('Failed to get messages', HttpStatus.BAD_REQUEST);
    //filter out messages of blocked users
    let filteredMessages = [];
    for (let i = 0; i < messages.length; i++){
      const isBlocked = await this.usersService.checkIfUserIsBlocked(user.id, messages[i].user_id);
      if (!isBlocked){
        filteredMessages.push(messages[i]);
      }
    }
    return filteredMessages;
  }

  @Get('get-other-rooms')
  @UseGuards(Jwt2faAuthGuard)
  async getOtherRooms(@Req() req: Request){
    const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
      const otherRooms = await this.usersService.getOtherRooms(user.id);
      if (!otherRooms)
        throw new HttpException('Failed to get rooms', HttpStatus.BAD_REQUEST);
      return otherRooms;
  }

  @Delete('delete-friend/:username')
  @UseGuards(Jwt2faAuthGuard)
  async deleteFriend(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username: string){
    const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    const friend= await this.usersService.findByUsername(username);
    if (!friend)
      throw new HttpException('Failed to delete friend', HttpStatus.BAD_REQUEST);
    const isDeleted = await this.usersService.deleteFriend(user.id, friend.id);
    if (!isDeleted)
      throw new HttpException('Failed to delete friend', HttpStatus.BAD_REQUEST);
    return 'Friend deleted seccussfully';
  }

  @Delete('delete-room/:roomId')
  @UseGuards(Jwt2faAuthGuard) 
  async deleteRoom(@Req() req: Request, @Param('roomId') roomId: string){
    const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    //check if the user is owner of the room
    const isDeleted = await this.usersService.deleteRoom(user.id, +roomId);
    if (!isDeleted)
      throw new HttpException('Failed to delete room', HttpStatus.BAD_REQUEST);
    return 'Room deleted seccussfully';
  }

  @Delete('delete-request/:username')
  @UseGuards(Jwt2faAuthGuard)
  async deleteRequest(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username: string){
      //check if the user is the acceptor of the request
      const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
      const isDeleted = await this.usersService.deleteRequest(user.id, username);
      if (!isDeleted)
        throw new HttpException('Failed to delete request', HttpStatus.BAD_REQUEST);
      return 'Request deleted seccussfully';
  }

  @Post('invite-to-game/:username')
  @UseGuards(Jwt2faAuthGuard)
  async inviteToGame(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username: string){
    const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    const friend = await this.usersService.findByUsername(username);
    if (!friend)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (user.username === friend.username)
      throw new HttpException('You are trying to invite yourself', HttpStatus.BAD_REQUEST);
    //check if they are friends
    const areFriends = await this.usersService.checkIfFriends(user.id, friend.id);
    if (!areFriends)
      throw new HttpException('Failed to invite friend to game', HttpStatus.BAD_REQUEST);
    this.notifications.sendGameRequestNotification(user.id, friend.id);
      return 'Friend invited seccussfully';
  }

  @Get('is-loggedin')
  @UseGuards(Jwt2faAuthGuard)
  isLoggedin(){
    return true;
  }

  @Get('get-my-role/:roomId')
  @UseGuards(Jwt2faAuthGuard)
  async getMyRole(@Req() req: Request, @Param('roomId') roomId: string){
    const user = await this.usersService.findOne(this.authService.extractIdFromPayload(req.user));
    const role = await this.usersService.getMyRole(user.id, +roomId);
    if (!role)
      throw new HttpException('Failed to get role', HttpStatus.BAD_REQUEST);
    return role;
  }

  @Get('get-all-users')
  @UseGuards(Jwt2faAuthGuard)
  async getAllUsers(@Req() req: Request){
    const users = await this.usersService.getAllUsers();
    if (!users)
      throw new HttpException('Failed to get users', HttpStatus.BAD_REQUEST);
    return users;
  }

  @Get('get-room/:roomId')
  @UseGuards(Jwt2faAuthGuard)
  async getRoom(@Req() req: Request, @Param('roomId') roomId: string){
    const room = await this.usersService.getRoomById(+roomId);
    // console.log(room)
    if (!room)
      throw new HttpException('Failed to get room', HttpStatus.BAD_REQUEST);
    return room;
  }

  @Post('get-member-role/:username')
  @UseGuards(Jwt2faAuthGuard)
  async getMemberRole(@Req() req: Request, @Param('username', UsernameStringToDtoPipe) username: string, @Body() body: RoomSettingsDto){
    const user = await this.usersService.findByUsername(username);
    const room = await this.usersService.findRoomByName(body.name);
    const role = await this.usersService.getMyRole(user.id, room.id);
    if (!role)
      throw new HttpException('Failed to get role', HttpStatus.BAD_REQUEST);
    return role;
  }


}
