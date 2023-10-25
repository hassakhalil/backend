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
    constructor(p5: p5)
    {
        this.p5 = p5;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.x_1 = 0;
        this.y_1 = 0;
        this.w_1 = 0;
        this.h_1 = 0;
    }
    show = (x: number, y: number, w: number, h: number) => {
    this.p5.rectMode(this.p5.CENTER);
    // console.log("draw rect");
    this.p5.rect(x, y, w, h, 10);
    }
}

export default Paddles;