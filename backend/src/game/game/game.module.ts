import { GameGateway } from './game.gateway';
import { Module, Provider } from '@nestjs/common';
import { gameService } from './game.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { JwtService } from "@nestjs/jwt";
import { NotificationsService } from 'src/chat/event.notifications';

@Module(
{
    providers: [GameGateway, gameService, PrismaService, UsersService, JwtService, NotificationsService],
    imports : [PrismaModule, UsersModule],
    
}
)
export class GameModule {

}