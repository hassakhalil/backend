
export class paddleClass {
   x: number;
    y: number;
    w = 10;
    h = 80;
    y_change = 0;
    height: number;         

    constructor(paddle_x: number, height: number) {
        this.x = paddle_x ;
        this.y = height / 2;
        this.height = height;
    }
    update = () => {
        this.y += this.y_change;
        if (this.y < this.h /2)
            this.y = this.h/2;
        else if ((this.height - (this.h / 2)) < this.y)
            this.y = this.height - (this.h / 2);
    }
    move = (steps : number, ball_y?: number) =>
    {
        const halfWindowWidth = 683 / 2 ;
        if (ball_y === undefined)
            this.y_change = steps * 0.6;      
        else
        {
            if (this.y - (this.h / 2) > ball_y)
                    this.y_change = -15 * 0.6;
            else if (this.y + (this.h / 2 ) < ball_y)
                    this.y_change = 15 * 0.6;
            if (this.y < this.h /2)
                this.y = this.h/2;
            else if ((this.height - (this.h / 2)) <  this.y)
                this.y = this.height - (this.h / 2);
        }
    }
}