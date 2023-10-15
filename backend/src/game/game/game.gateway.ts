import { Injectable, OnModuleInit } from '@nestjs/common';
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

@WebSocketGateway(
  {
    cors: {
      origin: ['http://localhost:5173'],
    },
  }
)
@Injectable()
export class GameGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  io: Server;
  private intervalId: NodeJS.Timeout;

  private readonly logger = new Logger(GameGateway.name);
  // private   initalTime : number;
  constructor(private readonly gameService: gameService)
  {}
  
  handleDisconnect(socket: Socket) {
    this.logger.log(`Cliend id:${socket.id} disconnected`);
    // console.log(thi)
    if (this.gameService.gameloaded(socket))
    {
      console.log("------------------ > game out" + socket.id);
      const gameId = this.gameService.getGameId(socket)
      const res = this.gameService.getGameResult(socket)
      console.log("res = " + this.gameService.getGameResult(socket));

      if (res[0] === 'default')
      {
        res[0] = 'false'
        res[1] = 'victory';
      }
      this.io.to(gameId).emit('delay', res);
      this.io.to(gameId).emit("disconnectAll")
      this.gameService.stopInterval(socket);
      this.gameService.removeGame(socket)
      console.log("socket " + socket.id)
    }
  }

  
  handleConnection(@ConnectedSocket() socket: Socket)
  {
    let gameduration = socket.handshake.query.gameDuration;
    let gameDuration = (parseInt(gameduration.toString(), 10));
    this.logger.log(`Client connected: ${socket.id}`);
    if (gameDuration !== 5 && this.gameService.isGameOpen(gameDuration - 1))
    {
      const gameId = this.gameService.joinGame(socket, gameDuration - 1)
      this.io.to(gameId).emit("GameStarted")
      setTimeout(() => {
        let result : string[] = [];
        result[0] = 'true';
        result[1] = undefined;
        this.io.to(gameId).emit('delay', result);
        this.gameService.gameTimer(socket, new Date().getTime());
      }, 1000)
      return ;
    }

    this.gameService.createGame(socket, gameduration);
    // console.log(gameMode);
    if (parseInt(gameduration.toString(), 10) === 5)
    {
      this.gameService.botJoinGame(gameDuration - 1);
      const gameId = this.gameService.getGameId(socket)
      this.io.to(gameId).emit("GameStarted")
      setTimeout(() => {
        let result : string[] = [];
        result[0] = 'true';
        result[1] = undefined;
        this.io.to(gameId).emit('delay', result);
        this.gameService.botTimer(socket, 1);
      }, 1000)
    }
    return 'new game cretead';
  }

  @SubscribeMessage('playerMovePaddle')
  playerMovePaddle(@MessageBody() newPosition :number, @ConnectedSocket() socket: Socket)
  {
    console.log("socket.id before search =" + socket.id)
    this.gameService.playerMovePaddle(newPosition, socket)
  }
  @SubscribeMessage("drawPaddles")
  draw(@ConnectedSocket() socket: Socket)
  {
    return (this.gameService.drawPaddles(socket))
  }
  @SubscribeMessage("updatePaddlePosition")
  updatePaddlePosition(@ConnectedSocket() socket: Socket)
  {
    this.gameService.updatePaddlePosition(socket)
  }
  @SubscribeMessage("stopPaddleMove")
  stopPaddleMove(@ConnectedSocket() socket: Socket)
  {
    this.gameService.stopPaddleMove(socket)
  }

  @SubscribeMessage("getballposition")
  getballposition(@ConnectedSocket() socket: Socket)
  {
    console.log("------> lmashakil" + socket.id);
    const PlayersId = this.gameService.getPlayersId(socket)
    return (this.gameService.getballposition(socket))
  }
  
  @SubscribeMessage("getScore")
  getScore(@ConnectedSocket() socket: Socket)
  {
    const gameId = this.gameService.getGameId(socket)
    this.io.to(gameId).emit('gameTimer', this.gameService.getTime(socket));
    const Score = this.gameService.getScore(socket)
    return Score;
  }
  }
