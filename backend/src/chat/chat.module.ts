import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { NotificationsService } from './event.notifications';

@Module({
  imports: [UsersModule, JwtModule],
  providers: [ChatService, ChatGateway, JwtService, NotificationsService]
})
export class ChatModule {}
