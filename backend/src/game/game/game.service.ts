import { dashBoard, gameTypes, playersIdType, playersType } from '../Classes/dashBoard';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { playerClass } from '../Classes/playerClass';
import { ballClass } from '../Classes/ballClass';
import { gameClass } from '../Classes/gameClass';
import { MetadataScanner } from '@nestjs/core';
import { randomUUID } from 'crypto';
import { ConnectedSocket } from '@nestjs/websockets';
import { match } from 'assert';
import { coordonationDTO } from '../DTOs/coordonation.DTO';
import { paddleClass } from '../Classes/paddleClass';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { botClass } from '../Classes/botClass';
// import { GameGateway } from './game.gateway';
@Injectable()
export class gameService {
    private dashBoard: dashBoard;
    constructor() {
        this.dashBoard = new dashBoard();
        for (let i = 1; i <= 5; i++) {
            this.dashBoard.games.push(new gameTypes());
            this.dashBoard.playersNumber.push(new playersType());
            this.dashBoard.allPlayersIDs.push(new playersIdType());
        }
    }
    getGameId(socket: Socket) {
        let gameDuration = this.getGameDuration(socket);

        const gp_index = this.matchPlayerFromSocketId(socket);
        console.log("socket" + socket.id);
        console.log("game_index" + gp_index[0]);
        console.log("gamDuration" + gameDuration);
        return (this.dashBoard.games[gameDuration].game[gp_index[0]].gameId);
    }
    isGameOpen(gameDuration: number) {
        console.log(this.dashBoard.playersNumber[gameDuration].Number % 2)
        return (this.dashBoard.playersNumber[gameDuration].Number % 2)
    }
    getGameDuration(socket: Socket) {
        let gp_index: number[] = []
        let gameDuration = 1;

        while (gameDuration !== 5) {
            if (this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs.indexOf(socket.id) !== -1)
                return (gameDuration);
            gameDuration += 1;
        }
        return (-1);
    }

    matchPlayerFromSocketId(socket: Socket): number[] {
        let gp_index: number[] = [];
        let gameDuration = 1;
        let tmp_value = 1;
        let index = 0;
        while (tmp_value !== 4) {
            if (this.dashBoard.allPlayersIDs[tmp_value].PlayersIDs)
                index = this.dashBoard.allPlayersIDs[tmp_value].PlayersIDs.indexOf(socket.id)
            if (index !== -1)
                break;
            tmp_value += 1;
        }
        gameDuration = tmp_value
        if (!this.dashBoard.games[gameDuration])
            return;
        for (let index = 0; index <= this.dashBoard.games[gameDuration].game.length - 1; index++) {
            if (this.dashBoard.games[gameDuration].game[index].players[0].socketId === socket.id) {
                gp_index.push(index)
                gp_index.push(0);
                break
            }
            else if (this.dashBoard.games[gameDuration].game[index].players[1].socketId === socket.id) {
                gp_index.push(index)
                gp_index.push(1)
                break;
            }
        }
        console.log(gp_index[0], gp_index[1]);
        return (gp_index);
    }
    createGame(@ConnectedSocket() socket: Socket , gameDuration: string | string[]) {
        const metaData =
        {
            windowWidth: 683, windowHeight: 331,
            width: 100, height: 100
        };
        let gameInstance = new gameClass();
        let playerInstance = new playerClass(0 + 10,
            metaData.windowHeight);
        let ballInstance = new ballClass(metaData.windowHeight, metaData.windowWidth);
        gameInstance.players.push(playerInstance);
        gameInstance.players[0].socketId = socket.id;
        gameInstance.gameDuration = parseInt(gameDuration.toString(), 10) - 1;
        console.log("gameDuration + " + gameInstance.gameDuration);
        gameInstance.ball = ballInstance;
        // gameInstance.gameMode = gameMode;
        gameInstance.gameStatus = 'Waiting'
        gameInstance.ball.score.push(0);
        gameInstance.ball.score.push(0);
        gameInstance.gameId = randomUUID()
        socket.join(gameInstance.gameId);
        // console.log("gameDuration = +" + gameDuration);
        this.dashBoard.games[gameInstance.gameDuration].game.push(gameInstance)
        this.dashBoard.playersNumber[gameInstance.gameDuration].Number += 1;
        this.dashBoard.allPlayersIDs[gameInstance.gameDuration].PlayersIDs.push(socket.id);
    }

    botJoinGame(gameDuration: number) {
        const metaData =
        {
            windowWidth: 683, windowHeight: 331,
            width: 100, height: 100
        };
        let playerInstance = new botClass(metaData.windowWidth - 10,
            metaData.windowHeight);
        this.dashBoard.games[gameDuration].game[this.dashBoard.games[gameDuration].game.length - 1].players.push(playerInstance);
        this.dashBoard.games[gameDuration].game[this.dashBoard.games[gameDuration].game.length - 1].players[1].socketId = "botMode";
        this.dashBoard.games[gameDuration].game[this.dashBoard.games[gameDuration].game.length - 1].gameStatus = 'playing';
        this.dashBoard.playersNumber[gameDuration].Number += 1;
        return this.dashBoard.games[gameDuration].game[this.dashBoard.games[gameDuration].game.length - 1].gameId;
    }

    gameTimer(socket: Socket, time?: number) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);
        let score = this.getScore(socket);
        let PlayersID = this.getPlayersId(socket);

        if (time) {
            this.dashBoard.games[gameDuration].game[gp_index[0]].initialTime = new Date().getTime();
            this.startInterval(socket);
        }

        var currentTime = new Date().getTime(); 
        var timeDifference = currentTime - this.dashBoard.games[gameDuration].game[gp_index[0]].initialTime;
        this.dashBoard.games[gameDuration].game[gp_index[0]].currentTime[0] = Math.floor(timeDifference / (1000 * 60));
        this.dashBoard.games[gameDuration].game[gp_index[0]].currentTime[1] = Math.floor((timeDifference % (1000 * 60)) / 1000);
        if (this.dashBoard.games[gameDuration].game[gp_index[0]].currentTime[0] === gameDuration + 1) {
            if (score[0] > score[1])
                this.dashBoard.games[gameDuration].game[gp_index[0]].res[1] = PlayersID[0];
            else if (score[0] < score[1])
                this.dashBoard.games[gameDuration].game[gp_index[0]].res[1] = PlayersID[1];
            this.dashBoard.games[gameDuration].game[gp_index[0]].res[0] = 'false';
            socket.emit('delay', this.getGameResult(socket));
            console.log("res = " + this.getGameResult(socket));
            socket.disconnect();
        }
    }

    botTimer(socket: Socket, start ?: number) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);
        let score = this.getScore(socket);
        let PlayersID = this.getPlayersId(socket);

        if (start)
            this.botstartInterval(socket);
        if (score[0] === 5 || score[1] === 5)
        {
            // console.log(score);
            if (score[0] > score[1])
                this.dashBoard.games[gameDuration].game[gp_index[0]].res[1] = PlayersID[0];
            else if (score[0] < score[1])
                this.dashBoard.games[gameDuration].game[gp_index[0]].res[1] = PlayersID[1];
            this.dashBoard.games[gameDuration].game[gp_index[0]].res[0] = 'false';
            socket.emit('delay', this.getGameResult(socket));
            console.log("res = " + this.getGameResult(socket));
            socket.disconnect();
        }
    }

    getGameResult(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);

        return (this.dashBoard.games[gameDuration].game[gp_index[0]].res);
    }

    botstartInterval(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);

        if (gameDuration === -1)
            return;
        this.dashBoard.games[gameDuration].game[gp_index[0]].intervalId = setInterval(() => {
            if (this.dashBoard.games[gameDuration].game[gp_index[0]]) {
                this.updateballposition(socket);
                this.botTimer(socket);
            }
        }
            , 16)
    }

    startInterval(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);

        if (gameDuration === -1)
            return;
        this.dashBoard.games[gameDuration].game[gp_index[0]].intervalId = setInterval(() => {
            if (this.dashBoard.games[gameDuration].game[gp_index[0]]) {
                this.updateballposition(socket);
                this.gameTimer(socket);
            }
        }
            , 16)
    }

    getTime(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket)
        let gameDuration = this.getGameDuration(socket);

        return (this.dashBoard.games[gameDuration].game[gp_index[0]].currentTime);
    }

    stopInterval(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);

        console.log(this.dashBoard.games[gameDuration].game[gp_index[0]])
        if (this.dashBoard.games[gameDuration].game[gp_index[0]].intervalId)
            clearInterval(this.dashBoard.games[gameDuration].game[gp_index[0]].intervalId);
    }

    calculateBallMoves(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket)
        let gameDuration = this.getGameDuration(socket);

        let leftPaddle = this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].paddle;
        let rightPaddle = this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].paddle;
        this.dashBoard.games[gameDuration].game[gp_index[0]].ball.update();
        this.dashBoard.games[gameDuration].game[gp_index[0]].ball.checkRightPaddle(rightPaddle.x,
            rightPaddle.y, rightPaddle.h);
        this.dashBoard.games[gameDuration].game[gp_index[0]].ball.checkLeftPaddle(leftPaddle.x,
            leftPaddle.y, leftPaddle.h);
        if (gameDuration === 4)
            this.dashBoard.games[gameDuration].game[gp_index[0]].ball.edges(490, 1062, 1);
        else
            this.dashBoard.games[gameDuration].game[gp_index[0]].ball.edges(490, 1062);
    }

    joinGame(socket: Socket, gameDuration: number) {
        const metaData =
        {
            windowWidth: 683, windowHeight: 331,
            width: 100, height: 100
        };
        let playerInstance = new playerClass(metaData.windowWidth - 10,
            metaData.windowHeight);
        this.dashBoard.playersNumber[gameDuration].Number += 1;
        playerInstance.socketId = socket.id;
        this.dashBoard.games[gameDuration].game[this.dashBoard.games[gameDuration].game.length - 1].players.push(playerInstance);
        socket.join(this.dashBoard.games[gameDuration].game[this.dashBoard.games[gameDuration].game.length - 1].gameId);
        this.dashBoard.games[gameDuration].game[this.dashBoard.games[gameDuration].game.length - 1].gameStatus = 'playing';
        this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs.push(socket.id);
        return this.dashBoard.games[gameDuration].game[this.dashBoard.games[gameDuration].game.length - 1].gameId;
    }

    playerMovePaddle(newPostion: number, socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket)
        let gameDuration = this.getGameDuration(socket);

        const foundsocket = this.dashBoard.games[gameDuration].game[gp_index[0]].players[gp_index[1]].socketId;
        this.dashBoard.games[gameDuration].game[gp_index[0]].players[gp_index[1]].paddle.move(newPostion);
    }

    drawPaddles(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);

        let coordonation = new coordonationDTO;
        // console.log(gp_index[0]);
        coordonation.x = this.dashBoard.games[gameDuration].game[gp_index[0]].players[gp_index[1]].paddle.x
        coordonation.y = this.dashBoard.games[gameDuration].game[gp_index[0]].players[gp_index[1]].paddle.y
        coordonation.w = this.dashBoard.games[gameDuration].game[gp_index[0]].players[gp_index[1]].paddle.w
        coordonation.h = this.dashBoard.games[gameDuration].game[gp_index[0]].players[gp_index[1]].paddle.h;
        if (gp_index[1] === 1)
            gp_index[1] = 0;
        else
            gp_index[1] = 1;
        if (this.dashBoard.games[gameDuration].game[gp_index[0]].players[gp_index[1]] === undefined) {
            coordonation.x_1 = 683 - 10;
            coordonation.y_1 = 331 / 2;
            coordonation.w_1 = this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].paddle.w
            coordonation.h_1 = this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].paddle.h;
            return (coordonation);
        }
        coordonation.x_1 = this.dashBoard.games[gameDuration].game[gp_index[0]].players[gp_index[1]].paddle.x;
        coordonation.y_1 = this.dashBoard.games[gameDuration].game[gp_index[0]].players[gp_index[1]].paddle.y;
        coordonation.w_1 = this.dashBoard.games[gameDuration].game[gp_index[0]].players[gp_index[1]].paddle.w;
        coordonation.h_1 = this.dashBoard.games[gameDuration].game[gp_index[0]].players[gp_index[1]].paddle.h;
        return (coordonation);

    }

    updatePaddlePosition(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);

        this.dashBoard.games[gameDuration].game[gp_index[0]].
            players[gp_index[1]].paddle.update();
        if ((gameDuration === 4) && Math.random() < 0.75
            && this.dashBoard.games[gameDuration].game[gp_index[0]].ball.x > 683 / 2) {
            this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].paddle.
                move(undefined, this.dashBoard.games[gameDuration].game[gp_index[0]].ball.y);
            if (Math.random() < this.dashBoard.games[gameDuration].game[gp_index[0]].ball.bot_error_ratio)
                this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].paddle.y_change = 0;
        }
        if (gameDuration === 4)
            this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].paddle.
                update();
        if (gameDuration === 4)
            this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].paddle.y_change = 0;
    }

    stopPaddleMove(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);

        this.dashBoard.games[gameDuration].game[gp_index[0]].
            players[gp_index[1]].paddle.y_change = 0;
    }

    gameloaded(socket: Socket) {
        let gameDuration = this.getGameDuration(socket);

        if (gameDuration === -1 || this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs.indexOf(socket.id) == -1)
            return (undefined);
        return (1);
    }

    updateballposition(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);

        let leftPaddle;
        let rightPaddle;

        if (!this.dashBoard.games[gameDuration].game[gp_index[0]])
            return;
        leftPaddle = this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].paddle;
        rightPaddle = this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].paddle;
        this.dashBoard.games[gameDuration].game[gp_index[0]].ball.update();
        this.dashBoard.games[gameDuration].game[gp_index[0]].ball.checkRightPaddle(rightPaddle.x,
            rightPaddle.y, rightPaddle.h);
        this.dashBoard.games[gameDuration].game[gp_index[0]].ball.checkLeftPaddle(leftPaddle.x,
            leftPaddle.y, leftPaddle.h);
        if (gameDuration === 4)
            this.dashBoard.games[gameDuration].game[gp_index[0]].ball.edges(490, 1062, 1);
        else
            this.dashBoard.games[gameDuration].game[gp_index[0]].ball.edges(490, 1062);
    }

    removeGame(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);

        const gameId = this.getGameId(socket);
        if (this.dashBoard.games[gameDuration].game[gp_index[0]].players[1]) {
            console.log("before = " + this.dashBoard.allPlayersIDs)
            this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs = this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs
                .filter(playerId => playerId !== this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].socketId);
            console.log("after" + this.dashBoard.allPlayersIDs)
            this.dashBoard.playersNumber[gameDuration].Number -= 1
        }
        if (this.dashBoard.games[gameDuration].game[gp_index[0]].players[0]) {
            this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs = this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs
                .filter(playerId => playerId !== this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].socketId);
            this.dashBoard.playersNumber[gameDuration].Number -= 1;
        }
        console.log("-----gameSIZE" + this.dashBoard.games[gameDuration].game.length)
        // console.log("before" + this.dashBoard.games[gameDuration].game[0]);
        // console.log("gameId" + gameId);
        // console.log("gameId" + this.dashBoard.games[1].game[0].gameId);
        this.dashBoard.games[gameDuration].game.splice(gp_index[0], 1);
        // console.log("aftre" + this.dashBoard.games[gameDuration].game[0]);
        // console.log("-----gameSIZE" + this.dashBoard.games[gameDuration].game.length)
    }

    getballposition(socket: Socket) {
        let ball_coordonation: number[] = [];
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);
        // console.log("players number = " + this.dashBoard.playersNumber);
        let leftPaddle = this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].paddle;
        let rightPaddle = this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].paddle;

        ball_coordonation[0] = this.dashBoard.games[gameDuration].game[gp_index[0]].ball.x;
        ball_coordonation[1] = this.dashBoard.games[gameDuration].game[gp_index[0]].ball.y;

        return (ball_coordonation);
    }
    getScore(socket: Socket) {
        let gameDuration = this.getGameDuration(socket);

        let players_score: number[] = [];
        console.log(gameDuration);
        let game_index = this.matchPlayerFromSocketId(socket);
        players_score.push(this.dashBoard.games[gameDuration].game[game_index[0]].ball.score[0]);
        players_score.push(this.dashBoard.games[gameDuration].game[game_index[0]].ball.score[1]);
        return (players_score);
    }

    getPlayersId(socket: Socket) {
        const players_id: string[] = [];
        const gp_index = this.matchPlayerFromSocketId(socket)
        let gameDuration = this.getGameDuration(socket);

        players_id.push(this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].socketId);
        players_id.push(this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].socketId);
        return players_id;
    }
}