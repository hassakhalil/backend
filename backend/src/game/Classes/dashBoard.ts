import { gameClass } from "./gameClass"

export class gameTypes
{
    game : gameClass[] = []
}

export class playersType
{
    Number: number = 0;
}

export class playersIdType
{
    PlayersIDs : string[] = [];
}

export class dashBoard
{
    games: gameTypes[] = [];
    // queue: queueClass[] = [];
    // gameId: number
    allPlayersIDs : playersIdType[] = []
    playersNumber : playersType[] = []
}