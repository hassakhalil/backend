import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game/game.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    GameModule,
    ChatModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
