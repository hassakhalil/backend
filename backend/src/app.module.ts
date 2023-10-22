import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game/game.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { EventEmitterModule } from '@nestjs/event-emitter';


@Module({
  imports: [
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    PrismaModule,
    ChatModule,
    ServeStaticModule.forRoot({
      rootPath: '/backend/public/',
      renderPath: '/backend/public/',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
