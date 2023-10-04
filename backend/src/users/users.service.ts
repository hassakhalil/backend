import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(un: string, payload: any) {
    const test = await this.findOne(payload.sub);
    if (test)
      return null;
    //give the user random avatar until he upload one of his own
    // const defaultavatar = await this.getAvatar();
    try{
      const user = await this.prisma.users.create({
            data: {
              username: un,
              intra_id: payload.sub,
              avatar: payload.photo,
            },
        });
      return user;
      
    }
    catch(error){
      console.log('Error :',error);
      return null;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    try{
      const user = await this.prisma.users.findUnique({
        where: {
          intra_id: id,
        },
      });
      return user;
    }
    catch(erro){
      return null;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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

  async updateavatar(path: string, id: string): Promise<boolean> {
    try{
      const updateUser = await this.prisma.users.update({
        where:{
          intra_id: id ,
        },
        data: {
          avatar: path,
        },
      });
      console.log('avatar uploaded seccussfully');
      return true;
    }
    catch(error){
      console.log('Error: failed to upload avatar');
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
      console.log("2fa secret set in the database successfully\n");
      return true;
    }
    catch(error){
      console.log("Error; failed to set the 2fa secret in the database\n");
      return false;
    }
  }

  async turnOnTwoFactorAuth(userId : string) :Promise<boolean> {
    try{
      const updateTwoFactorAuthState = await this.prisma.users.update({
        where: {
          intra_id: userId,
        },
        data: {
          is_two_factor_auth_enabled: true,
        },
      });
      console.log("2fa state changed in the database successfully\n");
      return true;
    }
    catch(error){
      console.log("Error; failed to change the 2fa state in the database\n");
      return false;
    }
  }

  async turnOffTwoFactorAuth(userId : string) :Promise<boolean> {
    try{
      const updateTwoFactorAuthState = await this.prisma.users.update({
        where: {
          intra_id: userId,
        },
        data: {
          is_two_factor_auth_enabled: false,
        },
      });
      console.log("2fa state changed in the database successfully\n");
      return true;
    }
    catch(error){
      console.log("Error; failed to change the 2fa state in the database\n");
      return false;
    }
  }
}
