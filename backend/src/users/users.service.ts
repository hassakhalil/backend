import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import { first } from 'rxjs';

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
  async getAvatar(un: string): Promise<string | null> {
    try{
      const user = await this.prisma.users.findUnique({
        where: {
          username: un,
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


  async getfriends(userId: number) {
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
          const FriendList = await this.getfriends(PersonalData.id);
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
        const friendId = await this.findByUsername(acceptorUsername);
        const invitation = await this.prisma.friendships.create({
          data: {
            sender_id: senderId,
            acceptor_id: friendId.id,
            fr_state: false,
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

}
