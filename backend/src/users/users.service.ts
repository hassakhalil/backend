import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RoomSettingsDto } from './dto/roomSettings.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(un: string, payload: any) :Promise<boolean>{
    const test = await this.findOne(payload.sub);
    if (test)
      return false;
    try{
      const user = await this.prisma.users.create({
            data: {
              username: un,
              intra_id: payload.sub,
              avatar: payload.photo,
            },
        });
      return true; 
    }
    catch(error){
      return false;
    }
  }
  async updateUsername(Username: string, userId: number) :Promise<boolean>{
    try{
        const isUpdated = await this.prisma.users.update({
          where: {
            id: userId,
          },
          data: {
            username: Username,
          },
        });
        if(!isUpdated)
          return false;
        return true;
    }
    catch(error){
      return false;
    }
  }

  async findOne(id: string) {
    try{
      const user = await this.prisma.users.findUnique({
        where: {
          intra_id: id,
        },
      });
      return {
        id:                         user.id,
        username:                   user.username,
        avatar:                     user.avatar,
        intra_id:                   user.intra_id,
        rating:                     user.rating,
        is_two_factor_auth_enabled: user.is_two_factor_auth_enabled,
      };
    }
    catch(erro){
      return null;
    }
  }

  async findByUsername(un: string) {
    try{
      const user = await this.prisma.users.findUnique({
        where: {
          username: un,
        },
      });
      return {
        id:                         user.id,
        username:                   user.username,
        avatar:                     user.avatar,
        rating:                     user.rating,
        intra_id:                   user.intra_id,
        is_two_factor_auth_enabled: user.is_two_factor_auth_enabled,
      };
    }
    catch(erro){
      return null;
    }
  }

  async findById(Id: number) {
    try{
      const user = await this.prisma.users.findUnique({
        where: {
          id: Id,
        },
      });
      return {
        username:                   user.username,
        avatar:                     user.avatar,
      };
    }
    catch(erro){
      return null;
    }
  }

  async getIntraIdFromDb(un: string){
    try{
      const user = await this.prisma.users.findUnique({
        where: {
          username: un,
        },
      });
      return user.intra_id;
    }
    catch(erro){
      return null;
    }
  }

  async getUsername(userId: number){
    try{
      const user = await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
      return user.username;
    }
    catch(erro){
      return null;
    }
  }

  //avatar
  async getAvatar(userName: string): Promise<string | null> {
    try{
      const user = await this.prisma.users.findUnique({
        where: {
          username: userName,
        },
      });
      return user.avatar;
    }
    catch(erro){
      return null;
    }
  }

  async updateAvatar(path: string, id: string): Promise<boolean> {
    try{
      const updateUser = await this.prisma.users.update({
        where:{
          intra_id: id ,
        },
        data: {
          avatar: path,
        },
      });
      return true;
    }
    catch(error){
      return false;
    }
  }

  //2fa 
  async setTwoFactorAuthSecret(secret: string, userId :string): Promise<boolean>{
    try{
      const updateTwoFactorAuthSecret = await this.prisma.users.update({
        where: {
          intra_id: userId,
        },
        data: {
          two_factor_auth_secret: secret,
        },
      });
      return true;
    }
    catch(error){
      return false;
    }
  }

  async updateTwoFactorAuthState(userId : string, state: boolean) :Promise<boolean> {
    try{
      const updateTwoFactorAuthState = await this.prisma.users.update({
        where: {
          intra_id: userId,
        },
        data: {
          is_two_factor_auth_enabled: state,
        },
      });
      return true;
    }
    catch(error){
      return false;
    }
  }


  async getFriends(userId: number) {
    try{
      const friend_list = await this.prisma.friendships.findMany({
        where: {
          OR:[
            {
                acceptor_id: {
                  equals: userId,
                },
            },
            {
                sender_id:  {
                  equals: userId,
                },
            },
          ],
          AND:{
            fr_state: {
              equals: true,
            }
          },
        },
        select: {
          acceptor_id: true,
          sender_id:    true,
        }
      });
      //loop over the table 
      //select just the friend id
      const filter = friend_list.map(item => {
        if (item.acceptor_id === userId){
          return {
            id: item.sender_id,
          };
        }
        else{
          return {
            id: item.acceptor_id,
          };
        }
      });
      return filter;
    }
    catch(error){
      return null;
    }
  }

  async getMatchHistory(userId: number) {
      try {
          const match_history = await this.prisma.games.findMany(
            {
              where: {
                OR:[
                  {
                      player_one_id: {
                        equals: userId,
                      },
                  },
                  {
                      player_two_id: {
                        equals: userId,
                      },
                  },
                ],
              },
              orderBy: {
                  date: 'asc',
              },
            }
          );
          return match_history;
      }
      catch(error){
        return null;
      }
  }

  async getAchievements(userId: number) {
      try{
          const achievements = await this.prisma.achievements.findMany({
              where:{
                user_id: userId,
              },
              select: {
                name:true,
              },
            });

          return achievements;
      }
      catch(error){
        return null;
      }
  }

  async getProfileData(un: string) {
      try {
          const PersonalData = await this.findByUsername(un);
          const FriendIds = await this.getFriends(PersonalData.id);
          //get friends usernames and avatars
          let FriendList = [];
          for (let i = 0; i < FriendIds.length ; i++){
            const friend = await this.findById(FriendIds[i].id);
            FriendList.push({
              id:         FriendIds[i].id,
              username:   friend.username,
              avatar:     friend.avatar,
            });
          }
          const MatchHistory = await this.getMatchHistory(PersonalData.id);
          const UserAchievements = await this.getAchievements(PersonalData.id);
          let wins = 0;
          let loses = 0;
          let draws = 0;
          MatchHistory.map(item => {
            if (item.player_one_score === item.player_two_score){
              draws++;
            }
            else if  ((item.player_one_id === PersonalData.id && item.player_one_score > item.player_two_score)
            || (item.player_two_id === PersonalData.id && item.player_one_score < item.player_two_score)){
              
              wins++;
            }
            else{
                loses++;
            }
          });

          return {
            user_data:     PersonalData,
            friends:       FriendList,
            match_history: MatchHistory,
            achievements:  UserAchievements,
            wins:          wins,
            loses:         loses,
            draws:         draws,
          };
      }
      catch(error){
        return null;
      }
  }

  //relations 

  async addFriend(senderId: number, acceptorUsername: string) :Promise<boolean>{
    //get the friend id
    try {
        const friend = await this.findByUsername(acceptorUsername);
        //check if the friendship 
        //search if the friendship already exist
        const isSender = await this.prisma.friendships.findMany({
          where: {
            sender_id: senderId,
            acceptor_id: friend.id,
          },
        });
        const isAcceptor = await this.prisma.friendships.findMany({
          where: {
            sender_id: friend.id,
            acceptor_id: senderId,
          },
        });
        if (isSender[0] || isAcceptor[0])
          return false;
        const invitation = await this.prisma.friendships.create({
          data: {
            sender_id: senderId,
            acceptor_id: friend.id,
            fr_state:     false,
          },
        });
        return true;
    }
    catch(error){
        return false
    }
  }

  async acceptFriend(acceptorId: number, senderUsername: string) :Promise<boolean>{
  
    try {
        const sender = await this.findByUsername(senderUsername);
        const isAccepted = await this.prisma.friendships.updateMany({
          where: {
            acceptor_id: acceptorId,
            sender_id: sender.id,
          },
          data: {
            fr_state: true,
          },
        });
        if (!isAccepted){
          return false;
        }
        return true;
    }
    catch(error){
      //debug
      // console.log(error);
      //end debug
      return false;
    }
  }

  async updateBlockState(userId: number, friendUsername: string, state: boolean) :Promise<boolean>{
    //get the friend id
    const friend = await this.findByUsername(friendUsername);
    try{
        //get the record id
        let recordToUpdate = await this.prisma.friendships.findMany({
          where: {
            sender_id: userId,
            acceptor_id: friend.id,
            fr_state: true,            
          },
        });
        //debug
        // console.log(recordToUpdate);
        //end debug
        if (recordToUpdate[0]){
                      
            const isAcceptorBlocked = await this.prisma.friendships.updateMany({
              where: {
                id: recordToUpdate[0].id,
              },
              data:{  
                is_acceptor_blocked: state,
              }
            });        
        }
        else {
          let recordToUpdate = await this.prisma.friendships.findMany({
            where: {
              sender_id: friend.id,
              acceptor_id: userId,
              fr_state: true,            
            },
          });
          //debug
          // console.log(recordToUpdate);
          //end debug
          const isSenderBlocked = await this.prisma.friendships.updateMany({
            where: {
              id: recordToUpdate[0].id,
            },
            data:{  
              is_sender_blocked: state,
            }
          });
          if (!isSenderBlocked)
            return false;
        }
        return true;
    }
    catch(error){
      return false;
    }
  }
  async hashPassword(password: string): Promise<string> {
    const saltOrrounds  = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrrounds);
    return hashedPassword;
  }


  async CreateRoom(adminId: number, body: RoomSettingsDto): Promise<boolean> {
    try {
      if (body.type!=='public' && body.type!=='protected' && body.type!=='private')
        return false;
      if (body.type === 'protected')  {
          if (!body.password)
            return false;
      }
      //if the room is protected //hash the password
      let hashedPassword = null;
      if (body.password)
        hashedPassword = await this.hashPassword(body.password);
      //create the room in rooms table
      const Room = await this.prisma.rooms.create({
        data: {
          name: body.name,
          type: body.type,
          password: hashedPassword,
        },
      });
      if (!Room)
        return false;
      //add the admin  to the management table
      const isManagementCreated = await this.prisma.managements.create({
        data: {
          user_id: adminId,
          room_id: Room.id,
          role: 'owner',
        },
      });
      return true;
    }
    catch(error){
      return false;
    }
  }

  async findRoomByName(roomName: string) {
    try {
      const room = await this.prisma.rooms.findUnique({
        where: {
          name: roomName,
        },
      });
      return room;
    }
    catch(error){
      return null;
    }
  }

  async joinRoom(memberId: number, body: RoomSettingsDto): Promise<boolean> {
    try {
      //search the database for that room
      if (body.type === 'direct')
        return false;
      const room = await this.findRoomByName(body.name);
      if (!room)
        return false;
      //if type is direct ---join 
      //if public --join
      if (room.type === 'public'){
        const isJoined = await this.prisma.managements.create({
            data: {
              room_id: room.id,
              user_id: memberId,
              role: 'member',
            }
        });
      }
      else if (room.type === 'protected'){
        //--check the password
        const isMatch = await bcrypt.compare(body.password, room.password);
        if (!isMatch)
          return false;
        const isJoined = await this.prisma.managements.create({
            data: {
              room_id: room.id,
              user_id: memberId,
              role: 'member',
            }
        });
      }
      else {
        //private room
        //if private --the user should receive an invitation to join
        return false;
      }
      return true;
    }
    catch(error) {
      return false;
    }
  }

  async createDirectRoom(userId: number, friendUsername: string): Promise<boolean> {
      try{
        //get friend id
        const friend  = await this.findByUsername(friendUsername);
        const Room = await this.prisma.rooms.create({
          data: {
            name: null,
            type: 'direct',
            password: null,
          },
        });
        const isUserAdded = await this.prisma.managements.create({
          data: {
            user_id: userId,
            room_id: Room.id,
            role: 'member',
          },
        });
        const isFriendAdded = await this.prisma.managements.create({
          data: {
            user_id: friend.id,
            room_id: Room.id,
            role: 'member',
          },
        });
        return true;
      }
      catch(error){
        return false;
      }
  }

  async checkIfUserExistsInRoom(userId: number, roomName: string): Promise<boolean> {
    try{
        const room = await this.findRoomByName(roomName);
        const isUserInRoom = await this.prisma.managements.findMany({
            where: {
              room_id: room.id,
              user_id: userId,
            }
        });
        if (isUserInRoom[0])
          return true;
        return false;
    }
    catch(error) {
      return false;
    }
  }

  async leaveRoom(memberId: number, roomId: number): Promise<boolean> {
      try{
        const isDeleted = await this.prisma.managements.deleteMany({
          where: {
            user_id: memberId,
            room_id: roomId,
          },
        });
        if (!isDeleted)
          return false;
        return true;
      }
      catch(error){
          return false;
      }
  }

  async checkIfUserIsOwner(userId: number, body: RoomSettingsDto): Promise<boolean> {
    try{
      const room = await this.findRoomByName(body.name);
      const isOwner = await this.prisma.managements.findMany({
        where: {
          user_id: userId,
          room_id: room.id,
          role: 'owner',
        },
      });
      if (!isOwner[0])
        return false;
      return true;
    }
    catch(error){
      return false;
    }
  }

  async addMember(userName: string, body: RoomSettingsDto): Promise<boolean> {
    try{
      const user = await this.findByUsername(userName);
      const room = await this.findRoomByName(body.name);
      const isAdded = await this.prisma.managements.create({
        data: {
          user_id: user.id,
          room_id: room.id,
          role: 'member',
        },
      });
      if (!isAdded)
        return false;
      return true;
    }
    catch(error){
      return false;
    }
  }

  async setAdmin(userName: string, body: RoomSettingsDto) : Promise<boolean> {
      try{ 
          const user = await this.findByUsername(userName);
          const room = await this.findRoomByName(body.name);
          const isAdminSet = await this.prisma.managements.updateMany({
            where: {
              user_id: user.id,
              room_id: room.id,
            },
            data: {
              role: 'admin',
            }
          });
          if (!isAdminSet)
            return false;
          return true;
      }
      catch(error) {
        return false;
      }
  }

  async setRoomPassword(body: RoomSettingsDto): Promise<boolean> {
      try{
          //get the room id
          const room = await this.findRoomByName(body.name);
          const hashedPassword = await this.hashPassword(body.password);
          const isPasswordSet = await this.prisma.rooms.update({
            where : {
              id: room.id,
            },
            data: {
              type: 'protected',
              password: hashedPassword,
            }
          });
          if (!isPasswordSet)
            return false;
          return true;
      }
      catch(erro){
        return false;
      }
  }

  async removeRoomPassword(body: RoomSettingsDto): Promise<boolean> {
    try{
      //get the room id
      const room = await this.findRoomByName(body.name);
      const isPasswordRemoved = await this.prisma.rooms.update({
        where : {
          id: room.id,
        },
        data: {
          type: 'public',
          password: null,
        }
      });
      if (!isPasswordRemoved)
        return false;
      return true;
  }
  catch(erro){
    return false;
  }

  }

  async checkIfUserIsAdmin(userId: number, body: RoomSettingsDto): Promise<boolean> {
      try{
        const room = await this.findRoomByName(body.name);
        const isOwner = await this.prisma.managements.findMany({
          where: {
            user_id: userId,
            room_id: room.id,
            role: 'owner',
          },
        });
        const isAdmin = await this.prisma.managements.findMany({
          where: {
            user_id: userId,
            room_id: room.id,
            role: 'admin',
          },
        });

        if (!isOwner[0] && !isAdmin[0])
          return false;
        return true;
      }
      catch(error){
        return false;
      }
  }

  async kickUser(userName: string, body: RoomSettingsDto): Promise<boolean> {
    try{
      const user = await this.findByUsername(userName);
      const room = await this.findRoomByName(body.name);
      const isUserOwner = await this.checkIfUserIsOwner(user.id, body);
      if (isUserOwner)
        return false;

      const isKicked = await this.prisma.managements.deleteMany({
        where: {
          user_id: user.id,
          room_id: room.id,
        },
      });
      if (!isKicked)
        return false;
      return true;
    }
    catch(error){ 
      return false;
    }
  }

  async updateBan(userName: string, body: RoomSettingsDto, state: boolean): Promise<boolean> {
    try { 
        const user = await this.findByUsername(userName);
        const isOwner = await this.checkIfUserIsOwner(user.id, body);
        if (isOwner)
          return false; 
        const room  = await this.findRoomByName(body.name);
        const isBanned = await this.prisma.managements.updateMany({
          where: {
            user_id: user.id,
            room_id: room.id,
          },
          data: {
            is_banned: state,
          }
        });
        if (!isBanned)
          return false;
        return true;
    }
    catch(error){
      return false;
    }
  }
  async muteMemeber(userName: string, body: RoomSettingsDto){
    try{
        //
        const user = await this.findByUsername(userName);
        const isOwner = await this.checkIfUserIsOwner(user.id, body);
        if (isOwner)
          return false; 
        const room  = await this.findRoomByName(body.name);
        const start_time  = Date.now();
        const end_time    = start_time + body.duration * 3600000;
        const isMuted = await this.prisma.managements.updateMany({
          where: {
            user_id: user.id,
            room_id: room.id,
          },
          data: {
            is_muted: true,
            mute_start: start_time,
            mute_end: end_time,
          },
        });
        if (!isMuted)
          return false;
        return true;
      }
    catch(error) {
      return false;
    }
  }

}
