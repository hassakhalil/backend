import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ChatModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
