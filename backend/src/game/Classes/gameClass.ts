import { ballClass } from './ballClass';
import {playerClass } from './playerClass';

export class gameClass{
    gameId: string;
    gameStatus: string;
    gameMode : string | string[];
    ball : ballClass;   
    res : string[] = [];
    gameDuration : number;
    initialTime : number;
    players : playerClass[] = [];
    intervalId : NodeJS.Timeout
    currentTime : number[] = [];
    // score: number[] = [];
    gameType: string;

    constructor()
    {
        this.res[0] = 'default';
        this.res[1] = 'default'
    }


}

