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
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
// import { GameGateway } from './game.gateway';

// let RATE = 60;
@Injectable()
export class gameService {
    private dashBoard: dashBoard;
    // private prisma: PrismaService;

    constructor(private prisma: PrismaService, private user: UsersService) {
        this.prisma = prisma;
        this.dashBoard = new dashBoard();
        for (let i = 0; i <= 6; i++) {
            this.dashBoard.games.push(new gameTypes());
            this.dashBoard.playersNumber.push(new playersType());
            this.dashBoard.allPlayersIDs.push(new playersIdType());
        }
    }
    getGameId(socket: Socket) {
        let gameDuration = this.getGameDuration(socket);

        const gp_index = this.matchPlayerFromSocketId(socket);
        if (this.IsDataValid(gameDuration, gp_index[0]))
            return;
        // //("socket" + socket.id);
        // //("game_index" + gp_index[0]);
        // //("gamDuration" + gameDuration);
        return (this.dashBoard.games[gameDuration].game[gp_index[0]].gameId);
    }
    isGameOpen(gameDuration: number) {

        if (!this.dashBoard.playersNumber[gameDuration])
            return (0);
        return (this.dashBoard.playersNumber[gameDuration].Number % 2)
    }

    isGameAvailble(OpponentId : number)
    {
        if (!this.dashBoard.playersNumber[5])
        return (0);
        if (this.dashBoard.games[5].game.find(item => (item.players[0].user_id === OpponentId)))
            return (1)
        return (0);
    }

    getgameindex(OpponentId : number, user_id  : number)
    {
        if (!this.dashBoard.playersNumber[5])
            return (0);
        return (this.dashBoard.games[5].game.findIndex(item => (item.players[0].user_id === OpponentId)))
        // return (0);
    }

    joinFriendGame(socket : Socket, user_id :number, OpponentId : number)
    {
        const gameindex = this.getgameindex(OpponentId, user_id);
        return (this.joinGame(socket, 5 , user_id, gameindex)) 
    }
    getGameDuration(socket: Socket) {
        let gp_index: number[] = []
        let gameDuration = 0

        while (gameDuration !== 6) {
            if (this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs.indexOf(socket.id) !== -1)
                return (gameDuration);
            gameDuration += 1;
        }
        return (-1);
    }
    
    matchPlayerFromSocketId(socket: Socket): number[] {
        let gp_index: number[] = [];
        let gameDuration = 0;
        let tmp_value = 0;
        let index = 0;
        // this.IsDataValid(gameDuration)
        while (tmp_value !== 5) {
            if (this.dashBoard.allPlayersIDs[tmp_value].PlayersIDs)
            index = this.dashBoard.allPlayersIDs[tmp_value].PlayersIDs.indexOf(socket.id)
            if (index !== -1)
            break;
        tmp_value += 1
        }
        gameDuration = tmp_value
        if (!this.dashBoard.games[gameDuration].game)
        {
            return;
        }
        for (let index = 0; index <= this.dashBoard.games[gameDuration].game.length - 1; index++) {
            if (this.dashBoard.games[gameDuration].game[index].players[0]
                && this.dashBoard.games[gameDuration].game[index].players[0].socketId === socket.id) {
                gp_index.push(index)
                gp_index.push(0);
                break
            }
            else if (this.dashBoard.games[gameDuration].game[index].players[1] && 
                this.dashBoard.games[gameDuration].game[index].players[1].socketId === socket.id) {
                gp_index.push(index)
                gp_index.push(1)
                break;
            }
        }
        return (gp_index);
    }
    


createGame(@ConnectedSocket() socket: Socket , gameDuration: string | string[], user_id : number) {
        const metaData =
        {
            windowWidth: 683, windowHeight: 331,
            width: 100, height: 100
        };
        let gameInstance = new gameClass();
        let playerInstance = new playerClass(0 + 10,
            metaData.windowHeight);
            playerInstance.user_id = user_id;
            let ballInstance = new ballClass(metaData.windowHeight, metaData.windowWidth);
            gameInstance.players.push(playerInstance);
            gameInstance.players[0].socketId = socket.id;
            gameInstance.gameDuration = parseInt(gameDuration.toString(), 10) - 1;
            gameInstance.ball = ballInstance;
            gameInstance.gameStatus = 'Waiting'
            gameInstance.ball.score.push(0);
            gameInstance.ball.score.push(0);
            gameInstance.gameId = randomUUID()
            socket.join(gameInstance.gameId);
        this.dashBoard.games[gameInstance.gameDuration].game.push(gameInstance)
        this.dashBoard.playersNumber[gameInstance.gameDuration].Number += 1;
        this.dashBoard.allPlayersIDs[gameInstance.gameDuration].PlayersIDs.push(socket.id);
        if (gameDuration === '6')
        {
            this.dashBoard.playersNumber[gameInstance.gameDuration].Number += 1;
        }
        this.dashBoard.allUsersIDs.push(user_id);
    }
    
    botJoinGame(gameDuration: number) {
        const metaData =
        {
            windowWidth: 683, windowHeight: 331,
            width: 100, height: 100
        };
        let playerInstance = new botClass(metaData.windowWidth - 10,
            metaData.windowHeight);
            playerInstance.user_id = -42;
            playerInstance.socketId = 'AI player';
            this.dashBoard.games[gameDuration].game[this.dashBoard.games[gameDuration].game.length - 1].players.push(playerInstance);
            this.dashBoard.games[gameDuration].game[this.dashBoard.games[gameDuration].game.length - 1].gameStatus = 'playing';
            this.dashBoard.playersNumber[gameDuration].Number += 1;
            return this.dashBoard.games[gameDuration].game[this.dashBoard.games[gameDuration].game.length - 1].gameId;
        }
        
        gameTimer(socket: Socket, time?: number) {
            let gp_index = this.matchPlayerFromSocketId(socket);
            let gameDuration = this.getGameDuration(socket);
            let score = this.getScore(socket);
            let PlayersID = this.getPlayersId(socket);
            
            if (time && this.dashBoard.games[gameDuration] && 
                this.dashBoard.games[gameDuration].game[gp_index[0]]) {
                this.dashBoard.games[gameDuration].game[gp_index[0]].initialTime = new Date().getTime();
                this.startInterval(socket);
            }
            if (!this.dashBoard.games[gameDuration].game[gp_index[0]])
                return ;
            var currentTime = new Date().getTime(); 
            var timeDifference = currentTime - this.dashBoard.games[gameDuration].game[gp_index[0]].initialTime;
            socket.emit('Score', this.getScore(socket));
            this.dashBoard.games[gameDuration].game[gp_index[0]].currentTime[0] = Math.floor(timeDifference / (1000 * 60));
            this.dashBoard.games[gameDuration].game[gp_index[0]].currentTime[1] = Math.floor((timeDifference % (1000 * 60)) / 1000);
            if (this.dashBoard.games[gameDuration].game[gp_index[0]].currentTime[0] === gameDuration + 1 
                    || (this.dashBoard.games[gameDuration].game[gp_index[0]].currentTime[0] === 1 &&
                            gameDuration === 5)) {
            if (score[0] > score[1])
            {
                this.dashBoard.games[gameDuration].game[gp_index[0]].res[1] = PlayersID[0];
            }
            else if (score[0] < score[1])
            this.dashBoard.games[gameDuration].game[gp_index[0]].res[1] = PlayersID[1];
            else
            {
                // ('---------> Draw');
                this.dashBoard.games[gameDuration].game[gp_index[0]].res[1] = 'Draw';
            }
        this.dashBoard.games[gameDuration].game[gp_index[0]].res[0] = 'false';
        socket.emit('delay', this.getGameResult(socket));
        socket.disconnect();
    }
}
userInGame(user_id : number)
{
    return (this.dashBoard.allUsersIDs.indexOf(user_id));
}

    async botAchievement(socket: Socket)
    {
        let gp_index = this.matchPlayerFromSocketId(socket)
        let gameDuration = this.getGameDuration(socket);
        let id_0 = this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].user_id;

        await this.checkAchievements(socket, 'Play With AI Player', id_0)
        if (this.dashBoard.games[gameDuration].game[gp_index[0]].ball.score[0] === 5)
            await this.checkAchievements(socket, 'Won Over AI Player', id_0);
    }

    botTimer(socket: Socket, start ?: number) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);
        let score = this.getScore(socket);
        let PlayersID = this.getPlayersId(socket);
        
        if (start)
        this.botstartInterval(socket);
    socket.emit('Score', this.getScore(socket));
    // ('score', score);
    // score[0] = 5;
    if (score === undefined)
        return;
    if (score[0] === 5 || score[1] === 5)
    {
        if (score[0] > score[1])
        {
            this.dashBoard.games[gameDuration].game[gp_index[0]].res[1] = 'You Won';
            // ('me won');
        }
    this.dashBoard.games[gameDuration].game[gp_index[0]].res[0] = 'false';
    socket.emit('delay', this.getGameResult(socket));
    socket.disconnect();

    }
}

    setResult(socket : Socket)
    {
        let gp_index = this.matchPlayerFromSocketId(socket)
        let gameDuration = this.getGameDuration(socket);

        if (this.IsDataValid(gameDuration, gp_index[0]))
        return;
        if (this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].socketId === socket.id)
        {
            this.dashBoard.games[gameDuration].game[gp_index[0]].ball.score[0] = 0;
            this.dashBoard.games[gameDuration].game[gp_index[0]].ball.score[1] = 3;
        }
        else
        {
            this.dashBoard.games[gameDuration].game[gp_index[0]].ball.score[0] = 3;
            this.dashBoard.games[gameDuration].game[gp_index[0]].ball.score[1] = 0;
        }
    }
    Probability(rating_0, rating_1) {
        return (
            (1.0 * 1.0) / (1 + 1.0 * Math.pow(10, (1.0 * (rating_0 - rating_1)) / 400))
        );
    }
    updateEloSystem(rating_0: number, rating_1: number, res : number)
    {
        const K = 30;
        let P_1 = this.Probability(rating_0, rating_1);
        let P_0 = this.Probability(rating_1, rating_0);
        let new_rating : number[] = [];

        if (res === 0) {
            new_rating[0] = rating_0 + K * (1 - P_0);
            new_rating[1] = rating_1 + K * (0 - P_1);
        }
        else if (res === 1){
            new_rating[0] = rating_0 + K * (0 - P_0);
            new_rating[1] = rating_1 + K * (1 - P_1);
        }   
        else
        {
            new_rating[0] = rating_0 + K * (0.5 - P_0);
            new_rating[1] = rating_1 + K * (0.5 - P_1);
        }
        return (new_rating);
}

async giveAchievement(Name : string, id : number)
{
    // ("give achievement");
    await this.prisma.achievements.create(
        {
            data:
            {
                name : Name,
                user_id : id,
            }
        }
    )
}

async  checkAchievements(socket : Socket, achieveName : string, userId : number)
{
    let gp_index = this.matchPlayerFromSocketId(socket)
    let gameDuration = this.getGameDuration(socket);

    let current = await this.prisma.achievements.findMany({where: {user_id: userId}});


    for (let i = 0; i <= current.length - 1; i++)
    {
        if (current[i].name === achieveName)
            return;
    }
    await this.giveAchievement(achieveName, userId);
}

async saveGame(socket : Socket)
{
    let gp_index = this.matchPlayerFromSocketId(socket)
    let gameDuration = this.getGameDuration(socket);
    let id_0 = this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].user_id;
    let id_1 = this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].user_id;
    let score = this.getScore(socket);
    let newRating;

    // save new game 
    await this.prisma.games.create({
        data: {
            player_one_id:       this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].user_id,
            player_two_id:       this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].user_id,
            player_one_score:    this.dashBoard.games[gameDuration].game[gp_index[0]].ball.score[0],
            player_two_score:    this.dashBoard.games[gameDuration].game[gp_index[0]].ball.score[1],
        },
    });
    // save new game  elo
    let user_0 = await this.prisma.users.findUnique({ where: { id: id_0 }});
    let user_1 = await this.prisma.users.findUnique({where: { id : id_1}});

    await this.checkAchievements(socket, 'Played Your First Game', id_0);
    await this.checkAchievements(socket, 'Played Your First Game', id_1);
    if (score[0] > score[1])
        newRating = this.updateEloSystem(user_0.rating, user_1.rating, 0);
    else if (score[1] > score[0])
        newRating = this.updateEloSystem(user_0.rating, user_1.rating, 0);
    else
        newRating = this.updateEloSystem(user_0.rating, user_1.rating, 0.5);
         await this.prisma.users.update({
              where: { id: id_0 },
              data: { rating:  newRating[0]},
            });
        await this.prisma.users.update({
            where: { id: id_1 },
              data: { rating:  newRating[1]},
            })
    // elo achievement
    if (newRating[0] === 800)
        await this.checkAchievements(socket, 'Get 800 Elo Point', id_0);
    else if (newRating[1] === 800)
        await this.checkAchievements(socket, 'Get 800 Elo Point', id_1);
    let username = await this.user.findById(id_0);
    let userData = await this.user.getProfileData(username.username);
    const friends = userData.friends;
    if (userData.loses + userData.wins + userData.draws === 7)
        await this.checkAchievements(socket, 'Played 7 Games', id_0);
    for (let i = 0; i <= friends.length - 1; i++)
    {
        if (friends[i].id === id_1)
        {
            await this.checkAchievements(socket,'Played a Game With Friend', id_0);
            await this.checkAchievements(socket,'Played a Game With Friend', id_1);
            break;
        }
    }
    username = await this.user.findById(id_1);
    userData = await this.user.getProfileData(username.username);
    if (userData.loses + userData.wins + userData.draws === 3)
    await this.checkAchievements(socket, 'Played 3 Games', id_1);
    if (userData.loses + userData.wins + userData.draws === 7)
        await this.checkAchievements(socket, 'Played 7 Games', id_1);
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
            , this.dashBoard.games[gameDuration].game[gp_index[0]].ball.RATE)
    }

    getTime(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket)
        let gameDuration = this.getGameDuration(socket);

        if (this.IsDataValid(gameDuration, gp_index[0]))
            return;
        return (this.dashBoard.games[gameDuration].game[gp_index[0]].currentTime);
    }

    stopInterval(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);
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

    joinGame(socket: Socket, gameDuration: number, user_id : number, gameindex ?: number) {
        const metaData =
        {
            windowWidth: 683, windowHeight: 331,
            width: 100, height: 100
        };
        if (!gameindex)
            gameindex = this.dashBoard.games[gameDuration].game.length - 1;
        let playerInstance = new playerClass(metaData.windowWidth - 10,
            metaData.windowHeight);
        if (gameDuration !== 5)
        this.dashBoard.playersNumber[gameDuration].Number += 1
        playerInstance.socketId = socket.id;
        playerInstance.user_id = user_id;
        // ("me user_id" + playerInstance.user_id);
        // //( this.dashBoard.games[gameDuration].game[this.dashBoard.games[gameDuration].game.length - 1]);
        this.dashBoard.games[gameDuration].game[gameindex].players.push(playerInstance);
        socket.join(this.dashBoard.games[gameDuration].game[gameindex].gameId);
        this.dashBoard.games[gameDuration].game[gameindex].gameStatus = 'playing';
        this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs.push(socket.id);
        this.dashBoard.allUsersIDs.push(user_id);
        return this.dashBoard.games[gameDuration].game[gameindex].gameId;
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
        // //(gp_index[0]);
        if (this.IsDataValid(gameDuration, gp_index[0]))
        return;
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

        if (this.IsDataValid(gameDuration, gp_index[0]))
            return;
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

        if (gameDuration === -1 || this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs.indexOf(socket.id) === -1)
        {
            return (undefined)
        }
        return (1);
    }

    updateballposition(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);

        let leftPaddle;
        let rightPaddle;

        if (this.IsDataValid(gameDuration, gp_index[0]))
        return;
        // //("game = " + this.dashBoard.games[gameDuration].game[gp_index[0]].ball.x)
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
            // //("game = " + this.dashBoard.games[gameDuration].game[gp_index[0]].ball.x);
    }

    removeGame(socket: Socket) {
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);

        const gameId = this.getGameId(socket);
        if (!this.dashBoard.games[gameDuration] || !this.dashBoard.games[gameDuration].game[gp_index[0]] 
            || !this.dashBoard.games[gameDuration].game[gp_index[0]])
            return;
        // ('game removed');
        if (this.dashBoard.games[gameDuration].game[gp_index[0]].players[1]) {
            // ("before = " + this.dashBoard.allPlayersIDs)
            this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs = this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs
                .filter(playerId => playerId !== this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].socketId);
            // ("after" + this.dashBoard.allPlayersIDs)
            this.dashBoard.playersNumber[gameDuration].Number -= 1
        }
        if (this.dashBoard.games[gameDuration].game[gp_index[0]].players[0]) {
            this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs = this.dashBoard.allPlayersIDs[gameDuration].PlayersIDs
                .filter(playerId => playerId !== this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].socketId);
            this.dashBoard.playersNumber[gameDuration].Number -= 1;
        }
        if (this.dashBoard.games[gameDuration].game[gp_index[0]].players[1])
            this.dashBoard.allUsersIDs = this.dashBoard.allUsersIDs
                .filter(user_id => user_id !== this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].user_id);
        this.dashBoard.allUsersIDs = this.dashBoard.allUsersIDs
        .filter(user_id => user_id !== this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].user_id);
        this.dashBoard.games[gameDuration].game.splice(gp_index[0], 1);
    }

    getballposition(socket: Socket) {
        let ball_coordonation: number[] = [];
        let gp_index = this.matchPlayerFromSocketId(socket);
        let gameDuration = this.getGameDuration(socket);
        // ("players number = " + this.dashBoard.playersNumber);
        if (this.IsDataValid(gameDuration, gp_index[0]))
        return;
        let leftPaddle = this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].paddle;
        let rightPaddle = this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].paddle;

        ball_coordonation[0] = this.dashBoard.games[gameDuration].game[gp_index[0]].ball.x;
        ball_coordonation[1] = this.dashBoard.games[gameDuration].game[gp_index[0]].ball.y

        return (ball_coordonation);
    }

    getUsersIds(socket : Socket)
    {
        let gp_index = this.matchPlayerFromSocketId(socket)
        let gameDuration = this.getGameDuration(socket);
        // ("players number = " + this.dashBoard.playersNumber);
        if (this.IsDataValid(gameDuration, gp_index[0]))
            return ;
        let users_ids : number[] = [];
        users_ids[0] = this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].user_id
        users_ids[1] = this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].user_id
        return (users_ids);
    }
    getScore(socket: Socket) {
        let gameDuration = this.getGameDuration(socket);

        let players_score: number[] = [];
        // (gameDuration);
        let game_index = this.matchPlayerFromSocketId(socket)
        if (this.IsDataValid(gameDuration, game_index[0]))
        return;
        // ("game duration = " + gameDuration);
        players_score.push(this.dashBoard.games[gameDuration].game[game_index[0]].ball.score[0]);
        players_score.push(this.dashBoard.games[gameDuration].game[game_index[0]].ball.score[1]);
        return (players_score);
    }

    IsDataValid(gameDuration :number,  index : number)
    {
        // (this.dashBoard.games[gameDuration])
        if (!this.dashBoard.games[gameDuration] ||
            ! this.dashBoard.games[gameDuration].game[index] ||
            !this.dashBoard.games[gameDuration].game[index].players[0] ||
            !this.dashBoard.games[gameDuration].game[index].players[1])
            return (1);
        return (0);
    }
    getPlayersId(socket: Socket) {
        const players_id: string[] = [];
        const gp_index = this.matchPlayerFromSocketId(socket)
        let gameDuration = this.getGameDuration(socket);

        
        if (this.IsDataValid(gameDuration, gp_index[0]))
            return;
        players_id.push(this.dashBoard.games[gameDuration].game[gp_index[0]].players[0].socketId);
        players_id.push(this.dashBoard.games[gameDuration].game[gp_index[0]].players[1].socketId);
        return players_id;
    }
}   