import { paddleClass } from './paddleClass';

export class playerClass{
    paddle : paddleClass;
    socketId : string;
    user_id : number;
    constructor(paddle_x: number, height:number)
    {
        this.paddle = new paddleClass(paddle_x, height);
    }

}