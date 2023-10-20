import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule],
  providers: [ChatService, ChatGateway, JwtService]
})
export class ChatModule {}
