import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game/game.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsService } from './chat/event.notifications';
import { UsersService } from './users/users.service';


@Module({
  imports: [
    UsersModule,
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    PrismaModule,
    GameModule,
    ChatModule,
    ServeStaticModule.forRoot({
      rootPath: '/backend/public/',
      renderPath: '/backend/public/',
    }),
  ],
  controllers: [AppController],
  providers: [NotificationsService],
})
export class AppModule {}
