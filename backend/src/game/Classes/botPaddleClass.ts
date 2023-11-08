
export class botPaddleClass {
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
    update = (ball_y : number) => {
        if (this.y > ball_y)
            this.y += 15;
        else if (ball_y > this.y)
            this.y -= 15;
        this.y += this.y_change;
        if (this.y < this.h /2)
            this.y = this.h/2;
        else if ((this.height - (this.h / 2)) < this.y)
            this.y = this.height - (this.h / 2);
    }
}