// import { botPaddleClass } from './botPaddleClass';
import { paddleClass } from './paddleClass';

export class botClass{
    paddle : paddleClass;
    socketId : string;
    user_id : number;
    constructor(paddle_x: number, height:number)
    {
        this.paddle = new paddleClass(paddle_x, height);
    }

}