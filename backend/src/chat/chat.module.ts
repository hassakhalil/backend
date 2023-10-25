import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { NotificationsService } from './event.notifications';
import { userInfo } from 'os';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [UsersModule],
  providers: [ChatService, ChatGateway, JwtService, NotificationsService, UsersService,PrismaService],
})
export class ChatModule {}
