// import { botPaddleClass } from './botPaddleClass';
import { paddleClass } from './paddleClass';

export class botClass{
    paddle : paddleClass;
    socketId : string;
    constructor(paddle_x: number, height:number)
    {
        this.paddle = new paddleClass(paddle_x, height);
    }

}