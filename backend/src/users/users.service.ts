import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs/promises';
import * as path from 'path';

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
        is_two_factor_auth_enabled: user.is_two_factor_auth_enabled,
      };
    }
    catch(erro){
      return null;
    }
  }

  //avatar
  async getAvatar(userId: string): Promise<string | null> {
    try{
      const user = await this.prisma.users.findUnique({
        where: {
          intra_id: userId,
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
            fr_status: {
              equals: true,
            }
          },
        },
      });
      return friend_list;
    }
    catch(error){
      return null;
    }
  }

  async getMatchHistory(userId: number) {
      // try {
      //     const match_history = await this.prisma.()
      // }
      // catch(error){
      //   return null;
      // }
  }

  async getProfileData(userId: string) {
    //return
      //profile data
      //list of friends---> where sender or acceptor = userId and state ==1
      //stats of the user---->calculated from games table
      //match history of the user----> all games where player_one or player_two == userId sorted by date
      //ladder of the user --->calculated
      //leaderboard---> calculated from games table
      try {
          const personalData = await this.findOne(userId);
          const friend_list = await this.getfriends(personalData.id);
          // const match_history = ;

          return {
            user_data: personalData,
            friends:   friend_list,
          };
      }
      catch(error){
        return null;
      }
  }
}
