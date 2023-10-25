import p5 from "p5";

class puck {
  p5 : p5;
  x: number;
  y: number;
  xspeed = 2;
  yspeed = 0.5;
  constructor(p5: p5) {
    this.p5 = p5;
    this.y = p5.height /2;
    this.x = p5.width / 2;
  }
  Show(x: number, y: number) {
    this.p5.ellipse(x, y, 24, 24);
  }
}

export default puck;

