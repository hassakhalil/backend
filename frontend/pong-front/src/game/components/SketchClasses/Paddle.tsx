import p5 from "p5";

class Paddles {
    p5: p5;
    x : number;
    y : number;
    w : number;
    h :number;
    x_1 : number;
    y_1 : number;
    w_1 : number;
    h_1 :number;
    buffer : any
    constructor(p5: p5, buffer : any)
    {
        this.p5 = p5;
        this.x = 10;
        this.y = 0;
        this.w = 10;
        this.h = 80;
        this.x_1 = 0;
        this.y_1 = 0;
        this.w_1 = 10;
        this.h_1 = 80;
        this.buffer = buffer;
    }
    show = (x: number, y: number, w: number, h: number) => {
    this.buffer.rectMode(this.p5.CENTER);

    this.buffer.rect(x, y, w, h, 10);
    }
}

export default Paddles;