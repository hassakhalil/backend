import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(un: string, id: string) {
    const test = await this.findOne(id);
    if (test)
      return null;
    //give the user random avatar until he upload one of his own
    // const defaultavatar = await this.getAvatar();
    try{
      const user = await this.prisma.users.create({
            data: {
              username: un,
              intra_id: id,
              // avatar: defaultavatar,
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
  async convertImageToBuffer(filepath: string): Promise<Buffer | null> {
    try{
        const imageBuffer = await fs.readFile(filepath);
        return imageBuffer;
    }
    catch(error){
      console.log("Error converting image to buffer");
      return null;
    }
  }

  async getAvatar(): Promise<Buffer | null> {
    const filepath = '/Users/hassan/Desktop/backend/backend/src/users/avatars/default_avatar.png';
    console.log('filepath == ', filepath);
    const imagebuffer = await this.convertImageToBuffer(filepath);
    if (!imagebuffer)
    {
      console.log('failed to generate random avatar');
      return null;
    }
    return imagebuffer;
  }

  async updateavatar(photo: Buffer, id: string): Promise<boolean> {
    try{
      const updateUser = await this.prisma.users.update({
        where:{
          intra_id: id ,
        },
        data: {
          avatar: photo,
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
}
