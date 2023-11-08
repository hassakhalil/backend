import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Jwt2faStrategy } from './jwt-2fa.strategy';
import { FortyTwoStrategy } from './fortytwo.strategy';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h'},
    }),
    UsersModule,
    PrismaModule,
  ],
  providers: [AuthService, Jwt2faStrategy, FortyTwoStrategy, UsersService, PrismaService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
