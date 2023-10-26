import { Injectable, OnModuleInit, UseGuards, Req } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server , Socket} from 'socket.io';
import { gameService  } from './game.service';
import { randomUUID } from 'crypto';
import { MetadataScanner } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import {metaData } from '../interfaces/metaData';
import { subscribe } from 'diagnostics_channel';
import { Logger } from '@nestjs/common';
import { OnGatewayDisconnect } from '@nestjs/websockets';
import { Jwt2faAuthGuard } from 'src/auth/jwt-2fa-auth.guard';
import {Request} from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
// import { JwtService } from "@nestjs/jwt";

@WebSocketGateway(
  {
    path: '/game',
    cors: {
      // namespace: 'game',
      origin: [`http://${process.env.REACT_APP_HOST}`],
    },
  }
)
@Injectable()
export class GameGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  io: Server;

  private readonly logger = new Logger(GameGateway.name)
  constructor(private readonly gameService: gameService)
  {}
  
  async handleDisconnect(Client: Socket) {
    this.logger.log(`Cliend id:${Client.id} disconnected`);
    if (this.gameService.gameloaded(Client))
    {
      const ids = this.gameService.getPlayersId(Client);
      const gameId = this.gameService.getGameId(Client)
      let result = this.gameService.getGameResult(Client)
      
      if (result[0] === 'default')
      {
        // console.log("set game Score");
        this.gameService.setResult(Client);
        result[0] = 'false'
        result[1] = 'You Won';
        console.log("winner = " + result[1]);
      }
      else if (result[1] === 'false')
      {
        if (result[1] === Client.id)
        result[1] = 'You Won'
    }
    // console.log("console.logitha" + ids[1]);
    if (ids && ids[1] !== undefined)
    {
      if (ids[1] !== 'AI player' )
        await this.gameService.saveGame(Client);
      else if (ids[1] === 'AI player')
      {
        await this.gameService.botAchievement(Client);
      }
    }
      this.gameService.stopInterval(Client);
      this.gameService.removeGame(Client)
      this.io.to(gameId).emit('delay', result)
      this.io.to(gameId).emit("disconnectAll")
    }
  }

  // @UseGuards(Jwt2faAuthGuard)
  async handleConnection(@ConnectedSocket() Client: Socket)
  {
      // console.log(Client.handshake.headers);
    let gameduration : string | string [];
    let id : string | string[];
    let user_id : number;
    gameduration = Client.handshake.query.gameDuration;
    id = Client.handshake.query.user_id;

    
    // console.log("connected");
  //   try {
  //     console.log(Client.handshake.headers.cookie);
  //     const Cookie = Client.handshake.headers.cookie.split("=")[1];
  //     // console.log("Cookie = ",Cookie);
  //     const payload = await this.jwtService.verifyAsync(Cookie, { secret: process.env.JWT_CONST });
  //     // Payload = payload;
  //     // console.log("Payload = ",Payload);
  //   }catch(error){
  //     console.log(error)
  //     // throw new WsException('unauthorized');
  //     Client.disconnect();
  //     //throw error
  // }
    // console.log("me = "÷+ id);
    if (id)
      user_id = parseInt(id.toString(), 10);
    if (this.gameService.userInGame(user_id) !== -1)
    {
      // console.log("user alrea     dy in game");
      let res : string[] = []
      res[0] = 'false';
      res[1] = 'Your Already In Game';
      Client.emit('delay', res);
      this.handleDisconnect(Client);
      // Client.disconnect();
      // console.log('___DISCONNECT___DBG___');
      // this.handleConnection(Client);
      return ;
      // Client.disconnect();
    }
    let gameDuration = (parseInt(gameduration.toString(), 10));
    this.logger.log(`Client connected: ${Client.id}`)
    // console.log("me = " + Client.handshake.query.userna me);
    if (gameDuration < 1 || gameDuration > 5)
      return ;
    if (gameDuration !== 5 && this.gameService.isGameOpen(gameDuration - 1))
    {
      const gameId = this.gameService.joinGame(Client, gameDuration - 1, user_id)
      this.io.to(gameId).emit("GameStarted")
      setTimeout(() => {
        let result : string[] = [];
        result[0] = 'true';
        result[1] = undefined;
        this.io.to(gameId).emit('delay', result)
        this.gameService.gameTimer(Client, new Date().getTime())
      }, 1000)
      return ;
    }

    this.gameService.createGame(Client, gameduration, user_id);
    if (parseInt(gameduration.toString(), 10) === 5)
    {
      this.gameService.botJoinGame(gameDuration - 1);
      const gameId = this.gameService.getGameId(Client)
      this.io.to(gameId).emit("GameStarted")
      setTimeout(() => {
        let result : string[] = [];
        result[0] = 'true';
        result[1] = undefined;
        this.io.to(gameId).emit('delay', result);
        this.gameService.botTimer(Client, 1);
      }, 1000)
    }
    return 'new game cretead'
  }
  @SubscribeMessage('playerMovePaddle')
  playerMovePaddle(@MessageBody() newPosition :number, @ConnectedSocket() Client: Socket)
  {
    if (this.gameService.gameloaded(Client))
    this.gameService.playerMovePaddle(newPosition, Client)
  }

  @SubscribeMessage("drawPaddles")
  draw(@ConnectedSocket() Client: Socket)
  {
    if (this.gameService.gameloaded(Client))
    return (this.gameService.drawPaddles(Client))
  }

  @SubscribeMessage("updatePaddlePosition")
  updatePaddlePosition(@ConnectedSocket() Client: Socket)
  {
    if (this.gameService.gameloaded(Client))
    this.gameService.updatePaddlePosition(Client)
  }
  // @UseGuards(Jwt2faAuthGuard)
  @SubscribeMessage("stopPaddleMove")
  stopPaddleMove(@ConnectedSocket() Client: Socket)
  {
    if (this.gameService.gameloaded(Client))
    this.gameService.stopPaddleMove(Client)
  }
  // @UseGuards(Jwt2faAuthGuard)
  @SubscribeMessage("getballposition")
  getballposition(@ConnectedSocket() Client: Socket)
  {
    //console("------> lmashakil" + Client.id);
    if (this.gameService.gameloaded(Client))
    {
      const PlayersId = this.gameService.getPlayersId(Client)
    return (this.gameService.getballposition(Client))}
  }
  // @UseGuards(Jwt2faAuthGuard)
  @SubscribeMessage("getScore")
  getScore(@ConnectedSocket() Client: Socket)
  {
    if (this.gameService.gameloaded(Client))
    {
      const gameId = this.gameService.getGameId(Client)
    this.io.to(gameId).emit('gameTimer', this.gameService.getTime(Client));
    const Score = this.gameService.getScore(Client)
    return Score;}
  }
  }
